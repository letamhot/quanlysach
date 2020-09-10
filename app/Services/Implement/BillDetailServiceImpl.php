<?php

namespace App\Services\Implement;

use App\Repositories\BillDetailRepository;
use App\Services\BillDetailService;
use Illuminate\Support\Str;

class BillDetailServiceImpl extends BaseServiceImpl implements BillDetailService
{
    
    public function __construct(BillDetailRepository $billDetailRepository)
    {
        $this->modelRepository = $billDetailRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function searchBillDetail($request)
    {
            return $this->modelRepository->searchBillDetail($request);
           
            
       
    }

     public function update($request, $billDetail)
    {
            $data = $request->all();
        
           
            return $this->modelRepository->update($data, $billDetail);

    }
    public function destroy($billDetail)
    {
        try {
            $billDetail->destroy();
        } catch (\Exception $e) {
            return null;
        }
    }
}