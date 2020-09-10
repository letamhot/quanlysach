<?php

namespace App\Repositories;

interface UserRepository extends BaseRepository
{
    public function searchUser($request);

}