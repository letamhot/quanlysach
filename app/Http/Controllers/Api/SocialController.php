<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;
use App\SocialAccount;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
// use Redirect;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function googleLoginUrl()
    {
        return Response::json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function loginCallback(Request $request)
    {

                $user = User::firstOrCreate([
                    'email' => $request->email
                ],
                [   'email' => $request->email,
                    'name' => $request->name,
                    'provider_id' => $request->provider_id,
                    'provider' => 'google',
                    'avatar' => $request->avatar,
                    'password' => Hash::make($request->provider_id)]);
                    // dd($user);
            if($user){
                Auth::login($user, true);
                return Response::json($user, 200);
            }
            return Response(null, 204);

    }
}
