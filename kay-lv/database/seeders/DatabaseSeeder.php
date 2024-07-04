<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Client;
use App\Models\Comment;
use App\Models\Fonction;
use App\Models\Projet;
use App\Models\Status;
use App\Models\Tache;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'login' => 'test@example.com',
        //     'password' => "test@example.com",
        // ]);
        // User::factory(9)->create();
        // Client::factory(9)->create();
        // Fonction::factory(9)->create();
        // Projet::factory(9)->create();
        // Status::factory(9)->create();
        // Tache::factory(1)->create();
        Comment::factory(1)->create();
    }
}
