<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductCreateRequest extends FormRequest
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
            'name' => 'required|min:3|max:100|string',
            'amount' => 'required|numeric|digits_between:1,20',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:10000',
            'price_input' => 'required|numeric|digits_between:1,20',
            'promotion_price' => 'required|numeric|digits_between:1,20|lt:price_input',
            'description' => 'required|string|min:3|max:200000',
        ];
    }
}
