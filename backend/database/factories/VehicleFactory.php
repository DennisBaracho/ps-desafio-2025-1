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

     // Cria um Id aleatório e o insere no URL de um gerador de dummy images, retornando uma imagem aleatória do banco
    public function generateImage(): string
    {
        $id = $this->faker->numberBetween(0, 1084);

        return "https://picsum.photos/id/$id/200/300";
    }
    // Cria parâmetros aleatórios para os veículos, e insere o id de uma categoria existente
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word,
            'image' => $this->generateImage(),
            'brand' => $this->faker->unique()->word,
            'model_year' => $this->faker->numberBetween(1990, 2025),
            'in_stock' => $this->faker->numberBetween(0, 10),
            'price' => $this->faker->numberBetween(20000.00, 140000.00),
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}