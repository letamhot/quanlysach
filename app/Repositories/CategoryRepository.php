<?php

namespace App\Repositories;

interface CategoryRepository extends BaseRepository
{
    public function searchCategory($request);
    public function show($slug);

}