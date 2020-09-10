<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Product;
use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Services\ProductService;
use App\Http\Resources\Product as ProductResource;


class ProductController extends Controller
{
    protected $productService;

    public function  __construct(ProductService $productService){
        $this->productService = $productService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
           
            $product = $this->productService->searchProduct($request);
            return ProductResource::collection($product);
        } catch (\Exception $e) {
            return $this->errorExceptionMessage();
        }
    
        
    }
    public function shop(Request $request)
    {
        try {
           
            $product = $this->productService->searchProduct($request);
            return ProductResource::collection($product);
        } catch (\Exception $e) {
            return $this->errorExceptionMessage();
        }
    
        
    }
    public function home(Request $request)
    {
        try {
           
            $product = $this->productService->searchProduct($request);
            return ProductResource::collection($product);
        } catch (\Exception $e) {
            return $this->errorExceptionMessage();
        }
    
        
    }
    public function getProductwithCategory($slugCategory){
        $category = Category::where("slug", $slugCategory)->get()->first();
        if($category){
            $product= Product::where("categories_id", $category->id)->paginate(5)->withQueryString()->get();
            return response()->json(['data' => $product->fresh(['category', 'producer'])], 200);
        }else {
            return null;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductCreateRequest $request)
    {
        // dd(Auth::user());
        if(Auth::user()->role_id == '1'){
        $product = $this->productService->create($request);
        // dd($product);
        return $product->fresh(["category", "producer"]);
        }
        else {
            return abort(401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return new ProductResource($product);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductUpdateRequest $request, Product $product)
    {
        if(Auth::user()->role_id == '1'){
        $product = $this->productService->update($request, $product);
        return $product->fresh(["category", "producer"]);
        }
        else {
            return abort(401);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if(Auth::user()->role_id == '1'){
        $this->productService->destroy($product);
        }
        else {
            return abort(401);
        }
    }

    protected function errorFailMessage()
    {
        $msg = [
            'status' => 500,
            'errors' => ['Failed!', 'Unknown error!'],
            'success' => false,
        ];

        return new ProductResource($msg);
    }
}
