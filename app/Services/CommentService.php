<?php

namespace App\Services;

interface CommentService extends BaseService
{
    public function searchComment($request);
}