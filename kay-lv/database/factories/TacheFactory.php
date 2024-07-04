<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tache>
 */
class TacheFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'idCollaborateur' => fake()->randomDigit(),
            'idClient' => fake()->randomDigit(),
            'idProjet' => fake()->randomDigit(),
            'idStatus' => fake()->randomDigit(),
            'description'=>fake()->text(30),
            'dateDebut'=>fake()->date(),
            'dateFin'=>fake()->date(),
            'facture'=>fake()->randomElement([0,1]),
            'necessite'=>fake()->randomElement(["l","n","h","e"])
        ];
    }
}
