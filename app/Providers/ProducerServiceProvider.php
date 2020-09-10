<?php

namespace App\Providers;

use App\Repositories\Implement\ProducerRepositoryImpl;
use App\Repositories\ProducerRepository;
use App\Services\Implement\ProducerServiceImpl;
use App\Services\ProducerService;
use Illuminate\Support\ServiceProvider;

class ProducerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            ProducerRepository::class,
            ProducerRepositoryImpl::class
        );

        $this->app->singleton(
            ProducerService::class,
            ProducerServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
