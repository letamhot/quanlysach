<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $table = "bills";
    protected $fillable = [ 'bill_id','product_id',
        'price_total', 'status','pay', 'date_order', 'user_id', 'phone', 'address'
    ];
    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function products(){
        return $this->belongsToMany(Product::class, 'bill_details', 'bill_id', 'product_id',  'id')->withPivot(['quantity', 'price']);
    }
}
