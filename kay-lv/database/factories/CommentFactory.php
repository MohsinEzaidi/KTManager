<?php

namespace Database\Factories;

use App\Models\Tache;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'comment' => fake()->sentence(),
            'idCollaborateur' => function () {
                return User::inRandomOrder()->first()->idCollaborateur;
            },
            'idTache' => function () {
                return Tache::inRandomOrder()->first()->idTache;
            },
        ];
    }
}
