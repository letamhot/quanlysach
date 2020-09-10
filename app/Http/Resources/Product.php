<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => $this->category,
            'producer' => $this->producer,
            'amount' => $this->amount,
            'image' => $this->image,
            'price_input' => $this->price_input,
            'promotion_price' => $this->promotion_price,
            'status' => $this->status,
            'description' => $this->description,
        ];     
    }
}
