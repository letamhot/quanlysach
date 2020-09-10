<?php

namespace App\Services;

interface CategoryService extends BaseService
{
    public function searchCategory($request);
    public function show($slug);
}