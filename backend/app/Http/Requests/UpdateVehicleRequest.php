<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
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
            'name' => ['sometimes', 'min:3', 'max:80'],
            'image' => ['file'],
            'brand' => ['sometimes'],
            'model_year' => ['sometimes'],
            'in_stock' => ['sometimes', 'min:0'],
            'price' => ['sometimes', 'decimal:2', 'min: 0.00'],
            'category_id' => ['sometimes'],
        ];
    }
}