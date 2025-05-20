<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'min:3', 'max:80'],
            'image' => ['required', 'file', 'mimes:png,jpeg,jpg,webp,svg'],
            'brand' => ['required'],
            'model_year' => ['required', 'integer', 'min:1886', 'max:2025'],
            'in_stock' => ['required', 'min:0'],
            'price' => ['required', 'decimal:2', 'min: 0.00'],
            'category_id' => ['required']
        ];
    }
}
