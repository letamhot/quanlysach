<?php

namespace App\Providers;

use App\Repositories\BillRepository;
use App\Repositories\Implement\BillRepositoryImpl;
use App\Services\BillService;
use App\Services\Implement\BillServiceImpl;
use Illuminate\Support\ServiceProvider;

class BillServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            BillRepository::class,
            BillRepositoryImpl::class
        );

        $this->app->singleton(
            BillService::class,
            BillServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
