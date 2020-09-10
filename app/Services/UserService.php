<?php

namespace App\Services;

interface UserService extends BaseService
{
    public function searchUser($request);
}