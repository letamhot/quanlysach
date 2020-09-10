<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Product extends Model 
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $table = 'products';
    protected $primarykey ="id";
    protected $fillable = ['name','slug', 'categories_id', 'producer_id',
     'amount', 'image', 'price_input', 'promotion_price', 'status', 'description'];
     public function category(){
         return $this->BelongsTo(Category::class, 'categories_id')->withTrashed();
    }

     public function producer(){
        return $this->BelongsTo(Producer::class, 'producer_id')->withTrashed();
    }
     public function carts()
    {
            return $this->belongsToMany(Cart::class, 'cart_products', 'product_id', 'cart_id' , 'id', 'user_id')->withPivot(['qty']);
        
    }

    // public function billDetails(){
    //     return $this->hasMany(BillDetail::class);
    // }
    public function bills(){
        return $this->belongsToMany(Bill::class, 'bill_details', 'product_id','bill_id',  'id')->withPivot(['quantity', 'price']);
    }
    public function comment(){
        return $this->belongsTo(Comment::class, 'product_id', 'id');
    }
}
