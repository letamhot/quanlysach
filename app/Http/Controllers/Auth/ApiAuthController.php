<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ApiAuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);

    }
    public function register (RegisterRequest $request) {
        try{
            $credentials = request(['name', 'email', 'password']);
            $credentials['password'] = Hash::make($credentials['password']);
            $user = User::create($credentials);
            $credentials = request(['email', 'password']);

            if (! $token = $this->guard()->attempt($credentials)) {
                return response()->json(['error' => 'Error Login'], 404);
            }

            return $this->respondWithToken($token);
        }catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
       
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        try{
            $credentials = request(['email', 'password']);
            $credentials['status'] = 1;

            if (! $token = $this->guard()->attempt($credentials)) {
                return response()->json(['error' => 'Error Login'], 401);
            }
    
            return $this->respondWithToken($token);
        } catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
       
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        if($this->guard()->user()){
            return response()->json($this->guard()->user());
        }else{
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
        
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function loggout()
    {
        // dd('aaa');

        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out'])->cookie('token', '', 0);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
  
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ])->cookie('token', $token, $this->guard()->factory()->getTTL() * 60);
    }

    public function guard()
    {
        return Auth::guard();
    }
}

