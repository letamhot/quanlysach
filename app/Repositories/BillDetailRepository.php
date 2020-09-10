<?php

namespace App\Repositories;

interface BillDetailRepository extends BaseRepository
{
    public function searchBillDetail($request);
}
