<?php

namespace App\Providers;

use App\Repositories\CategoryRepository;
use App\Repositories\Implement\CategoryRepositoryImpl;
use App\Services\CategoryService;
use App\Services\Implement\CategoryServiceImpl;
use Illuminate\Support\ServiceProvider;

class CategoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            CategoryRepository::class,
            CategoryRepositoryImpl::class
        );

        $this->app->singleton(
            CategoryService::class,
            CategoryServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
