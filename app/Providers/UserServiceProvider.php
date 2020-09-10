<?php

namespace App\Providers;

use App\Repositories\Implement\UserRepositoryImpl;
use App\Repositories\UserRepository;
use App\Services\Implement\UserServiceImpl;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            UserRepository::class,
            UserRepositoryImpl::class
        );

        $this->app->singleton(
            UserService::class,
            UserServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
