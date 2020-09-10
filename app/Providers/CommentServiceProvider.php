<?php

namespace App\Providers;

use App\Repositories\CommentRepository;
use App\Repositories\Implement\CommentRepositoryImpl;
use App\Services\CommentService;
use App\Services\Implement\CommentServiceImpl;
use Illuminate\Support\ServiceProvider;

class CommentServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            CommentRepository::class,
            CommentRepositoryImpl::class
        );

        $this->app->singleton(
            CommentService::class,
            CommentServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
