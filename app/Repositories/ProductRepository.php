<?php

namespace App\Repositories;

interface ProductRepository extends BaseRepository
{
    public function searchProduct($request);
    public function getProductwithCategory($slugCategory);

}