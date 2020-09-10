<?php

namespace App\Repositories\Implement;
use App\Cart;
use App\Repositories\CartRepository;
use App\Repositories\Eloquent\EloquentRepository;
use Illuminate\Database\Eloquent\Builder;

// use App\Http\Resources\Cart as CartResource;


class CartRepositoryImpl extends EloquentRepository implements CartRepository
{
    /**
     * Certain model.
     *
     * @return string
     */
    public function getModel()
    {
        return Cart::class;
    }

    public function searchCart($request)
    {
        try {
                $cart =  $this->model::when($request->has('search'), function($query){
                    $query
                    ->where('id', 'LIKE', '%' . request('search') . '%')
                    ->orWhereHas('product', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    });
                })->paginate(10)->withQueryString();
           
        } catch (\Exception $e) {
            return null;
        }
        return $cart;
    }


    public function destroy($cart)
    {
        try {
            if($this->model::where('status' == '1')){
                 $cart->destroy();
            }else {
                return "Trạng thái chờ";
            }
           
        } catch (\Exception $e) {
            return null;
        }
    }
   
}