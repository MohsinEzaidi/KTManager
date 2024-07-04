<?php

// app/Http/Controllers/ProjetsController.php
namespace App\Http\Controllers;

use App\Models\Projet;
use App\Models\User;
use Illuminate\Http\Request;

class ProjetsController extends Controller
{
    public function index()
    {
        $projets = Projet::with("user")->get();

        return response()->json(['projets' => $projets], 200);
    }

    public function get_dev_team($idProjet)
    { {
            $project = Projet::with("user")->find($idProjet);

            if (!$project) {
                return response()->json(['message' => 'Project not found'], 404);
            }

            $users = $project->users()->distinct()->get();

            return response()->json(['users' => $users], 200);
        }
    }
    public function get_projects_by_collaborateur($idCollaborateur)
    {
        $user = User::findOrFail($idCollaborateur);

        $projects = $user->taches()
            ->with(['projet', 'projet.user'])
            ->get()
            ->pluck('projet')
            ->unique()
            ->values();

        return response()->json(['projets' => $projects], 200);
    }
    public function show($id)
    {
        $projet = Projet::with("user")->find($id);

        if (!$projet) {
            return response()->json(['message' => 'Projet not found'], 404);
        }

        return response()->json(['projet' => $projet], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'idCollaborateur' => 'required',
            'libelle' => 'required',
        ]);

        $projet = Projet::create($request->all());

        return response()->json(['projet' => $projet], 201);
    }

    public function update(Request $request, $id)
    {
        $projet = Projet::find($id);

        if (!$projet) {
            return response()->json(['message' => 'Projet not found'], 404);
        }

        $projet->update($request->all());

        return response()->json(['projet' => $projet], 200);
    }

    public function destroy($id)
    {
        $projet = Projet::with('taches', 'user')->find($id);

        if (!$projet) {
            return response()->json(['message' => 'Projet not found'], 404);
        }

        // Delete related tasks
        $projet->taches()->delete();

        // Detach users (developers) related to this project
        $projet->users()->detach();

        // Delete the project
        $projet->delete();

        return response()->json(['message' => 'Projet and related data deleted'], 200);
    }
}
