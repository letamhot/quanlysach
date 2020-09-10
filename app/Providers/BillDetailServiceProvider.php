<?php

namespace App\Providers;

use App\Repositories\BillDetailRepository;
use App\Repositories\Implement\BillDetailRepositoryImpl;
use App\Services\BillDetailService;
use App\Services\Implement\BillDetailServiceImpl;
use Illuminate\Support\ServiceProvider;

class BillDetailServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(
            BillDetailRepository::class,
            BillDetailRepositoryImpl::class
        );

        $this->app->singleton(
            BillDetailService::class,
            BillDetailServiceImpl::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
    }
}
