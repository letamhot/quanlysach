<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Bill extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $price_total= 0;
        foreach($this->products as $product){
            $price_total += $product->pivot->quantity * $product->pivot->price;
        }
        return [
            'id' => $this->id,
            'user' => $this->user,
            'phone' => $this->phone,
            'address' => $this->address,
            'status' => $this->status,
            'pay' => $this->pay,
            'date_order' => $this->date_order,
            'price_total' => $price_total,
            'product' => $this->products
        ]; 
    }
}
