<?php

namespace App\Repositories;

interface CommentRepository extends BaseRepository
{
    public function searchComment($request);

}