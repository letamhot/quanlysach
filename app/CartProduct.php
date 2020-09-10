<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CartProduct extends Model
{
    protected $table = "cart_products";
    protected $fillable = ['product_id', 'cart_id', 'qty'];

    // public function carts(){
    //     return $this->belongsToMany(Cart::class);
    // }
    // public function carts(){
    //     return $this->belongsToMany(Cart::class);
    // }
}
