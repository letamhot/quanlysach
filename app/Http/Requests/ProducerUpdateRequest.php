<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProducerUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->producer->id;
        return [
            'name' => "required|unique:producers,name,$id|max:255",
            'address' => 'required|string|max:255',
            'phone' => "required|unique:producers,phone,$id|digits_between:6,25 | numeric",
            'tax_code' => "required|unique:producers,tax_code,$id|digits_between:10,20 | numeric",
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:10000',

        ];
    }
}
