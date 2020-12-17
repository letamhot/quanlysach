<?php

namespace App\Services\Implement;

use App\Repositories\BillRepository;
use App\Services\BillService;
use Illuminate\Support\Str;

class BillServiceImpl extends BaseServiceImpl implements BillService
{
    
    public function __construct(BillRepository $billRepository)
    {
        $this->modelRepository = $billRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function searchBill($request)
    {
            return $this->modelRepository->searchBill($request);
           
            
       
    }

     public function update($request, $bill)
    {
            $data = $request->all();
        
           
            return $this->modelRepository->update($data, $bill);

    }
    public function destroy($bill)
    {
        try {
            $bill->delete();
        } catch (\Exception $e) {
            return null;
        }
    }
}