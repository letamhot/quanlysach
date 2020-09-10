<?php

namespace App\Services;

interface ProductService extends BaseService
{
    public function searchProduct($request);
    public function getProductwithCategory($slugCategory);
}