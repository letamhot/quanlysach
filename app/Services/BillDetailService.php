<?php

namespace App\Services;

interface BillDetailService extends BaseService
{
    public function searchBillDetail($request);
}