<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Auth;

use App\Services\UserService;
use App\Http\Resources\User as UserResource;


class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        // $this->middleware( 'role:Admin' );
        $this->userService = $userService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
           
            $user = $this->userService->searchUser($request);
            return userResource::collection($user);
        } catch (\Exception $e) {
            return $this->errorExceptionMessage();
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        if(Auth::user()->role_id == '1'){
    //    dd($user);
        $user = $this->userService->update($request, $user);
        // dd($user);
        return new UserResource($user);
        }
        else {
            return abort(401);
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $User
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if(Auth::user()->role_id == '1'){
        $this->userService->destroy($user);
        }
        else {
            return abort(401);
        }
    }
    
}
