<?php

namespace App\Repositories;

interface CartRepository extends BaseRepository
{
    public function searchCart($request);

}