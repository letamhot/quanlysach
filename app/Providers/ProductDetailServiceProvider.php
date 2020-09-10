<?php

namespace App\Providers;

use App\Repositories\Implement\ProductDetailRepositoryImpl;
use App\Repositories\ProductDetailRepository;
use App\Services\Implement\ProductDetailServiceImpl;
use App\Services\ProductDetailService;
use Illuminate\Support\ServiceProvider;

class ProductDetailServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            ProductDetailRepository::class,
            ProductDetailRepositoryImpl::class
        );

        $this->app->singleton(
            ProductDetailService::class,
            ProductDetailServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
