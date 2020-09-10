<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Bill;
use App\User;
use App\Product;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }
    public function totalBill(){

        $day_bills = [];
        $day_total =[];
        $month_total =[];

        $billOfMonth = Bill::with('products')->whereMonth('date_order', date('m'))->whereYear('date_order', date('Y'))->get();
        $tmp = $billOfMonth->groupBy(function($bill){
            return (int) date('d', strtotime($bill->date_order));
        });
        foreach($tmp as $key => $bills){
            $day_total[$key] = $bills->sum(function($bill){
                $total = $bill->products->sum(function($product){
                    
                    return $product->pivot->quantity * $product->pivot->price;
                });
                return $total;
            });
    
        }

 
        $billYear = Bill::with('products')->whereYear('date_order', date('Y'))->get();
        $tmp = $billYear->groupBy(function($bill ){
            return (int) date('m', strtotime($bill->date_order));
        });
        foreach($tmp as $key => $bills){
            $month_total[$key] = $bills->sum(function($bill){
                $total = $bill->products->sum(function($product){
                    
                    return $product->pivot->quantity * $product->pivot->price;
                });
                return $total;
            });
    
        }

       

    
       


        //Tổng tiền khách đã đặt
        $totalBill =[];
        $bill = Bill::with('products')->where('status', 1)->whereDate('date_order', '=', date('Y-m-d'))->get();
        // dd($bill);
        $countBill = $bill->count();
        foreach ($bill as $bills) {
            foreach($bills->products as $product){
            if($product->promotion_price == 0){
                $price = $product->price_input;
            }else {
                $price = $product->promotion_price;
            }
            $totalBill[]=['price_total' => $price * $product->pivot->quantity ,'count_product' => $product->pivot->quantity];
            }
            
            
        }
        $price_total = collect($totalBill)->sum('price_total');
        $count_product = collect($totalBill)->sum('count_product');
        $data = ['count' =>$countBill,'total' =>$price_total , 'count_product' => $count_product, 'day' =>$day_total, 'month' => $month_total];
        

        return response()->json($data, 200);
       
    }

    public function userActive(){
        $user = User::where('status', 1)->orWhere('role_id', 2)->get();
        // dd(($user)->count());
        return $user->count();
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
    public function destroy($id)
    {
        //
    }
}
