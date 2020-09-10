<?php

namespace App\Repositories;

interface BillRepository extends BaseRepository
{
    public function searchBill($request);
}
