<?php

namespace App\Http\Controllers\Api;

use App\Bill;
use App\BillDetail;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\CartService;
use App\Cart;
use App\CartProduct;
use App\Http\Requests\OrderCartRequest;
use App\Http\Requests\UpdateCartRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Cart as CartResource;
use App\Http\Resources\BillDetail as BillDetailResource;
use App\Product;
use App\User;
use App\Mail\ShoppingMail;
use Mail;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        // $this->middleware( 'role:Admin' );
        $this->cartService = $cartService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
            try {
           
                $cart = $this->cartService->searchCart($request);
                return response()->json(['data' => $cart->fresh(['user', 'products'])], 200);

            } catch (\Exception $e) {
                return $e->getMessage();
            }
     
    }
    public function updateCart(Request $request, $id){

        try{
                $cart = Cart::firstOrCreate(['user_id' =>Auth::user()->id],
                ['user_id' =>Auth::user()->id]);
                if($cart->products->where('id', $id)->first() == null)
                {
                    $cart->products()->syncWithoutDetaching(
                        [$id => 
                        ['qty' => $request->qty]]);
                }else{
                    $carts = $cart->products->where('id', $id)->first();
                    if($request->qty < $carts->amount){
                    $cart->products()->syncWithoutDetaching(
                        [$id => 
                        ['qty' =>  $request->qty]]);
                    }else{
                        return response()->json(['err' => "Quantity must not be greater than the amount"], 500);
                    }
                }
        }catch (\Exception $e) 
        {
            return $e->getMessage();
        }
       
        return $cart->fresh(['user','products']);

    }
    //AddCart
    public function addCart(Request $request){
        try{
            //Kiểm tra đăng nhập hay chưa
            if(Auth::user()){
                $cart = Cart::firstOrCreate(['user_id' =>Auth::id()],
                ['user_id' =>Auth::id()]);

                $hasCarts = $cart->products->where('id', $request->product_id)->first();

                //Nếu là sản phẩm đầu tiên
                if($hasCarts == null)
                {
                    $cart->products()->syncWithoutDetaching(
                        [$request->product_id => 
                        ['qty' => $request->qty]]);

                //Thêm sản phẩm vào giỏ hàng nếu trùng với sản phẩm trong giỏ thì cộng thêm 1 
                }else{
                    //Kiểm tra sản phẩm thêm vào giỏ có lớn hơn tổng sản phảm còn lại
                    if($hasCarts->pivot->qty < $hasCarts->amount){
                        $cart->products()->syncWithoutDetaching(
                        [$request->product_id => 
                        ['qty' => (optional($hasCarts->pivot)->qty ?? 0) + 1]]);
                    //thông báo lỗi khi sản phẩm thêm vào lướn hơn sản phẩm còn lại
                    }else{
                        return response()->json(['error' => "Quantity must not be greater than amount"], 500);

                    }
                }
                //Yêu cầu đăng nhập trước khi thêm vào giỏ
            }else{
                return response()->json(['error' => "You should login before buying"], 500);
            }
                
            }catch (\Exception $e) 
            {
                return $e->getMessage();
            }
        return $cart->fresh(['user','products'], 200);
    }
    //Load form cart
    public function getCart(Request $request){
        $cart = Cart::firstOrCreate(['user_id' =>Auth::id()],
        ['user_id' =>Auth::id()]);
        return $cart->fresh(['user','products']);
    }
    public function getProductPromotionPriceFirst(){
        
        $productFirst = Product::where('promotion_price', '<>',  0 )->get()->first();
        return $productFirst->fresh(['category', 'producer']);
    }
    //đặt hàng
    public function orderCart(OrderCartRequest $request){
        //Kiểm tra nếu là tài khoản khách hàng mới cho đặt hàng
        if(Auth::user()->role_id == 2){
           
            $cart = Cart::with('products')->find(Auth::id());
            //Kiểm tra thông tin khách hàng trước khi đặt hàng            
            if(count($cart->products) > 0){
                $data = $request->all();
                $data['phone'] = $request->phone;
                $data['address'] = $request->address;
                $bill = Auth::user()->bills()->create($data);
                $billDetail =[];
                foreach($cart->products as $product){
                    if($product->promotion_price == 0){
                        $price = $product->price_input;
                    }else{
                        $price = $product->promotion_price;
                    }
                   $billDetail[$product->id]=['product_id' => $product->id, 'quantity' => $product->pivot->qty, 'price' => $price];
                   $product['amount'] -= $product->pivot->qty;
                    $product->save();
            
                }               
                try{
                   
                   
                    $bill->products()->attach($billDetail);
                    //Mail thông báo đơn hàng
                    $myEmail = Auth::user()->email;
                    $details = [
                        'title' => 'Mail Access from Book Shop',
                        'url' => 'http://quanlysach.herokuapp.com/',
                    ];
                    $billde = $bill->fresh('products');

                    Mail::to($myEmail)->send(new ShoppingMail($details, $billde, $bill));
                }catch (\Exception $e) 
                {
                    $bill->delete();
                    return $e->getMessage();
                }
    
                    $cart->products()->detach();
                return $bill->fresh(['user', 'products']);
            }else{
                return response()->json(['error' => "Your shopping cart is empty"], 500);
            }
         //Là quyền admin không được đặt hàng  
        }else {
            return response()->json(['error' => "The admin account has no right to order"], 500);
        }
       
    }

    public function checkOrder(){
        
        $user = Auth::user();
        // dd($user->bills->product_id);
        return $user->bills->fresh(['products']);
    }

    public function showOrder(Request $request, $id){
        $order = Bill::find($id);
        // dd($order);
        $product = $order->fresh(['products']);

        // dd($product);
        return BillDetailResource::collection($order->products);
    }

    public function deleteOrder($id){
        $delBill = Bill::find($id);
        // dd($delBill->products);
        foreach($delBill->products as $product){
            $product->increment('amount', $product->pivot->quantity);
    
        }
        $delBill->delete();
        return $delBill->fresh(['products']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //Xóa sản  phẩm khỏi giỏ hàng
    public function destroy($id)
    {
       
        $cart = Cart::find(Auth::id());
        // dd($cart->products()->detach($id));
        $cart->products()->detach($id);
        return $cart->fresh(['user', 'products']);
        
    }
}
