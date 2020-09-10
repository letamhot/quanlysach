<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';
    protected $fillable = [
        'user_id', 'product_id', 'comment'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function products(){
        return $this->hasMany(Product::class);
    }
}
