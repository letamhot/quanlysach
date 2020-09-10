<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BillDetail extends Model
{
    protected $table = "bill_details";
    protected $fillable = [
        'price', 'quantity', 'product_id', 'bill_id'
    ];
}
