<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(['label' => 'Carro',]);
        Category::create(['label' => 'Caminhão',]);
        Category::create(['label' => 'Moto',]);
        Category::create(['label' => 'SUV',]);
        Category::create(['label' => 'Sedan',]);
    }
    }