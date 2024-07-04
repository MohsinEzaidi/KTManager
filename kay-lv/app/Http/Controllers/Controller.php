<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Projet;
use App\Models\Status;
use App\Models\Tache;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function tache_edit_data(){
        $users = User::select("idCollaborateur", "nom", "prenom")->get();
        $clients = Client::select("idClient", "libelle")->get();
        $projets = Projet::select("idProjet", "libelle")->get();
        $statuses = Status::select("idStatus", "etape")->get();

        // Organize the data into an array
        $data = [
            'users' => $users,
            'clients' => $clients,
            'projets' => $projets,
            'statuses' => $statuses
        ];

        // Return the data as JSON response
        return response()->json($data);
    }
    public function projet_edit_data(){
        $users = User::where("idFonction",3)->select("idCollaborateur", "nom", "prenom")->get();
        return response()->json($users);
    }

}
