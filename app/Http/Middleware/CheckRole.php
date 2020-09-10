<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

use Illuminate\Contracts\Auth\Guard;


class CheckRole
{
    /**
    * The Guard implementation.
    *
    * @var Guard
    */
   protected $auth;

   /**
    * Create a new filter instance.
    *
    * @param  Guard  $auth
    * @return void
    */
   public function __construct(Guard $auth)
   {
       $this->auth = $auth;
   }

   /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Closure  $next
    * @return mixed
    */
   public function handle($request, Closure $next, $role)
   {
       $user = $this->auth->guest();
   
        if (!$this->auth->guest()) {
           
                return response('Unauthorized.', 401);
        
        }
            return $next($request);
    
    }
}