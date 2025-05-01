<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word,
            #'image' => $this->faker()->
            'brand' => $this->faker->unique()->word,
            'model_year' => $this->faker->numberBetween(1990, 2025),
            'in_stock' => $this->faker->numberBetween(0, 10),
            'price' => $this->faker->numberBetween(20000.00, 140000.00),
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}
