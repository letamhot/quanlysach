<?php

namespace App\Services;

interface BillService extends BaseService
{
    public function searchBill($request);
}