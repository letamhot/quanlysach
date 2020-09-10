<?php

namespace App\Services\Implement;

use App\Repositories\ProductDetailRepository;
use App\Services\ProductDetailService;
use App\Services\ProductService;
use Illuminate\Support\Str;
class ProductDetailServiceImpl extends BaseServiceImpl implements ProductDetailService
{
    
    public function __construct(ProductDetailRepository $productDetailRepository)
    {
        $this->modelRepository = $productDetailRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function ProductDetail($slug)
    {
            return $this->modelRepository->ProductDetail($slug);
    }
}