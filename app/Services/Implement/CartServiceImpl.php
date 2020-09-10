<?php

namespace App\Services\Implement;

use App\Repositories\CartRepository;
use App\Services\CartService;
use Illuminate\Support\Str;

class CartServiceImpl extends BaseServiceImpl implements CartService
{
    
    public function __construct(CartRepository $cartRepository)
    {
        $this->modelRepository = $cartRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function searchCart($request)
    {
            return $this->modelRepository->searchCart($request);
           
            
       
    }

    public function destroy($Cart)
    {
        try {
            return $this->modelRepository->destroy($cart);
        } catch (\Exception $e) {
            return null;
        }
    }
   
}