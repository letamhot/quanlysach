<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
 



Route::get('/', function () {
    return view('frontend.home');
});
Route::get('/home', function () {
    return view('frontend.home');
});
Route::get('/shop', function () {
    return view('frontend.shop');
});
Route::get('/cart', function () {
    return view('frontend.cart');
});
Route::get('/product/{slug}', function ($slug) {
    return view('frontend.shop');
});
Route::get('/productDetail/{slug?}', function ($slug=null) {
    return view('frontend.product-detail');
});
Route::get('/checkout', function () {
    return view('frontend.checkout');
});
Route::get('/order', function () {
    return view('frontend.orderShow');
});
Route::get('/showOrder/{bill?}', function ($bill=null) {
    return view('frontend.order');
});
Route::get("/admin/{index?}", function($index=null){
    return view('index');
});

