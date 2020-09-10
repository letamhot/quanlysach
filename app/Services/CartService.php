<?php

namespace App\Services;

interface CartService extends BaseService
{
    public function searchCart($request);
}