<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProducerCreateRequest extends FormRequest
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
        return [
            'name' => "required|unique:producers,name|max:255",
            'address' => 'required|string|max:255',
            'phone' => 'required|unique:producers,phone|digits_between:10,20 | numeric',
            'tax_code' => 'required|unique:producers,tax_code|digits_between:10,30 | numeric',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:10000',
        ];
    }
}
