<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producer extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $table = 'producers';
    protected $fillable = ['name','slug', 'address', 'phone', 'tax_code', 'image'];

    public function products(){
        return $this->HasMany(Product::class, 'producer_id')->withTrashed();
    }
    // public function album(){
    //     return $this->BelongsTo(Album::class, 'producer_id')->withTrashed();
    // }
}
