<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';
    public function users(){
        $this->hasMany(User::class, "role_id");
    } 
}
