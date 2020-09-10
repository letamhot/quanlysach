<?php

namespace App\Providers;

use App\Repositories\CartRepository;
use App\Repositories\Implement\CartRepositoryImpl;
use App\Services\CartService;
use App\Services\Implement\CartServiceImpl;
use Illuminate\Support\ServiceProvider;

class CartServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            CartRepository::class,
            CartRepositoryImpl::class
        );

        $this->app->singleton(
            CartService::class,
            CartServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
