<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primarykey = "id";
    protected $fillable = [
        'name', 'email', 'password', 'role_id', 'avatar', 'status', 'provider_id', 'provider'
    ];
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function role(){
        return 
        $this->belongsTo(Role::class, 'role_id');
    }
    public function cart()
    {
            return $this->belongsTo('App\Cart', 'user_id', 'id');
        
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function hasRole(Role $role)
    {
        return $this->role()->get()->contains($role);
    }

    public function bills(){
        return $this->hasMany(Bill::class);
    }
    
}
