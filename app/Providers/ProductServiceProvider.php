<?php

namespace App\Providers;

use App\Repositories\Implement\ProductRepositoryImpl;
use App\Repositories\ProductRepository;
use App\Services\Implement\ProductServiceImpl;
use App\Services\ProductService;
use Illuminate\Support\ServiceProvider;

class ProductServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            ProductRepository::class,
            ProductRepositoryImpl::class
        );

        $this->app->singleton(
            ProductService::class,
            ProductServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
