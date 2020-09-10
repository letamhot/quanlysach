<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $table = 'categories';
    protected $fillable = ['name','slug', 'image'];

    public function products(){
        return $this->HasMany(Product::class, 'categories_id')->withTrashed();
    }
    // public function album(){
    //     return $this->BelongsTo(Album::class, 'categories_id')->withTrashed();
    // }
}
