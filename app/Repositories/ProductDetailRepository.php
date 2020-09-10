<?php

namespace App\Repositories;

interface ProductDetailRepository extends BaseRepository
{
    public function productDetail($slug);

}