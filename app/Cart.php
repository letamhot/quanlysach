<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';
    protected $primaryKey = "user_id";
    protected $increments = false;
    protected $fillable = ['user_id'];

    public function products()
    {
            return $this->belongsToMany(Product::class, 'cart_products', 'cart_id', 'product_id','user_id',  'id')->withPivot(['qty']);
        
    }

   public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
        
}
