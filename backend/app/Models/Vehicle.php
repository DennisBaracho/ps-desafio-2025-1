<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Vehicle extends Model
{
    /** @use HasFactory<\Database\Factories\VehicleFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'image',
        'brand',
        'model_year',
        'in_stock',
        'price',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    protected static function booted(){
        self::deleted(function(Vehicle $vehicle){
            try {
                $image_name = explode('image/', $vehicle['image']);
                Storage::disk('public')->delete('image/' .$image_name[1]);
            } catch (Throwable) {
            }
        });
    }
}