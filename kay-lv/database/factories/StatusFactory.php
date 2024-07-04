<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Status>
 */
class StatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "etape"=>fake()->randomElement(["saisie","affecte","developpment","test unitaire","test integration","deploiement","done"]),
            "dateDebut"=>now(),
            "dateFin"=>fake()->date("Y-m-d","2024-12-30")
        ];
    }
}
