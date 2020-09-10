<?php

namespace App\Services;

interface ProductDetailService extends BaseService
{
    public function productDetail($slug);

}