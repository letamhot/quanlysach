<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BillDetail extends JsonResource
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
            'image' => $this->image,
            'slug' => $this->slug,
            'quantity' => $this->pivot->quantity,
            'price' => $this->pivot->quantity * $this->pivot->price,
        ]; 
    }
}
