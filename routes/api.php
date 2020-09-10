<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['api']], function () {
   //producer
    Route::apiResource('producer', 'Api\ProducerController');
    //bill
    Route::apiResource('bill', 'Api\BillController');
    Route::apiResource('billDetail', 'Api\BillDetailController');
   //category
    Route::apiResource('category', 'Api\CategoryController');
    Route::get('category/show/{slug}', 'Api\CategoryController@show');
    //product
    Route::get('product/{slug}', 'Api\ProductController@getProductwithCategory');
    Route::get('shop', 'Api\ProductController@shop');
    Route::get('home', 'Api\ProductController@home');
    Route::apiResource('product', 'Api\ProductController');
    //product_detail
    Route::get('productDetail/{slug}', 'Api\ProductDetailController@show');
    //cart
    Route::post('/cart/addCart', 'Api\CartController@addCart');
    Route::get('/cart/checkOrder', 'Api\CartController@checkOrder');
    Route::get('/cart/showOrder/{bill}', 'Api\CartController@showOrder');
    Route::post('/cart/updateCart/{product}', 'Api\CartController@updateCart');
    Route::get('/cart/getCart', 'Api\CartController@getCart');
    Route::post('/cart/orderCart', 'Api\CartController@orderCart');
    Route::delete('/deleteOrder/{id}', 'Api\CartController@deleteOrder');
    Route::get('/cart/showProductPromotionPrice/', 'Api\CartController@getProductPromotionPriceFirst');
    Route::apiResource('cart', 'Api\CartController');
    //user
    Route::apiResource('user', 'Api\UserController');
    Route::apiResource('role', 'Api\RoleController');

    //comment
    Route::resource('/comment', 'Api\CommentController');
    
    //login-register-logout
    Route::get('auth/google/url', 'Api\SocialController@googleLoginUrl');
    Route::post('auth/google/callback', 'Api\SocialController@loginCallback');
    Route::post('login', 'Auth\ApiAuthController@login');
    Route::post('register', 'Auth\ApiAuthController@register');
    Route::post('refresh', 'Auth\ApiAuthController@refresh');
    Route::post('me', 'Auth\ApiAuthController@me');
    Route::get('logout', 'Auth\ApiAuthController@loggout');

    Route::get('/dashboard/totalBill', 'Api\DashboardController@totalBill');
    Route::get('/dashboard/userActive', 'Api\DashboardController@userActive');
    Route::resource('/dashboard', 'Api\DashboardController');

});

// Route::middleware('auth:api')->get('/user', function (Request $request) {

//     return $request->user();
// });








