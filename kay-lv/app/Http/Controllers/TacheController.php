<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tache;
use Carbon\Carbon;
use Illuminate\Http\Response;

class TacheController extends Controller
{

    public function index()
    {
        $taches = Tache::with(['user', 'client', 'projet', 'status', 'comments'])->orderBy("dateDebut")->get();

        // Format dateDebut and dateFin
        $formattedTaches = $taches->map(function ($tache) {
            $tache['formattedDateDebut'] = Carbon::parse($tache['dateDebut'])->format('M d');
            $tache['formattedDateFin'] = Carbon::parse($tache['dateFin'])->format('M d');
            return $tache;
        });

        return response()->json(['taches' => $formattedTaches], Response::HTTP_OK);
    }
    public function get_collaborateur_taches($idCollaborateur, $idProjet)
    {
        $query = Tache::where("idCollaborateur", $idCollaborateur);
        if ($idProjet) {
            $query = $query->where("idProjet", $idProjet);
        }
        $taches = $query->with(["status", "user", "comments"])->orderBy("dateDebut")->get();
        $formattedTaches = $taches->map(function ($tache) {
            $tache['formattedDateDebut'] = Carbon::parse($tache['dateDebut'])->format('M d');
            $tache['formattedDateFin'] = Carbon::parse($tache['dateFin'])->format('M d');
            return $tache;
        });
        return response()->json(['taches' => $formattedTaches], Response::HTTP_OK);
    }
    public function taches_by_project($idProjet)
    {

        $query = Tache::with(['user', 'client', 'projet', 'status', 'comments'])->orderBy("dateDebut");

        // Add the condition to filter tasks based on idProjet
        if ($idProjet) {
            $query->where('idProjet', $idProjet);
        }

        $taches = $query->get();

        // Format dateDebut and dateFin
        $formattedTaches = $taches->map(function ($tache) {
            $tache['formattedDateDebut'] = Carbon::parse($tache['dateDebut'])->format('M d');
            $tache['formattedDateFin'] = Carbon::parse($tache['dateFin'])->format('M d');
            return $tache;
        });

        return response()->json(['taches' => $formattedTaches], Response::HTTP_OK);
    }
    public function add_comment(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'idTache' => 'required|exists:taches,idTache',
            'comment' => 'required|string',
        ]);

        try {
            // Find the task by its ID
            $tache = Tache::findOrFail($request->input('idTache'));

            // Add the comment to the tache
            $tache->comment = $request->input('comment');
            $tache->save();

            return response()->json(['message' => 'Comment added successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            // Handle any exceptions or errors
            return response()->json(['message' => 'Failed to add comment', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function undone_tasks($idProject)
    {
        // Get undone tasks for the specified project
        $undoneTasks = Tache::with(["user"])->where('idProjet', $idProject)
            ->whereHas('status', function ($query) {
                $query->where('etape', '!=', 'done');
            })
            ->get();

        return response()->json(['taches' => $undoneTasks], 200);
    }
    public function get_id_project($idCollaborateur)
    {
        $tache = Tache::where('idCollaborateur', $idCollaborateur)
            ->where('dateFin', '>', Carbon::now())
            ->orderBy('dateFin', 'asc')
            ->first();

        if ($tache) {
            $idProjet = $tache->idProjet;

            return response()->json([
                'idProjet' => $idProjet,
            ], 200);
        } else {
            return response()->json([
                'message' => 'No matching project found.',
            ], 404);
        }
    }

    public function show($id)
    {
        $tache = Tache::with(["user", "client", "projet", "status"])->find($id);

        if (!$tache) {
            return response()->json(['message' => 'Tache not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['tache' => $tache], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'idCollaborateur' => 'required|exists:users,idCollaborateur',
            'idClient' => 'required|exists:clients,idClient',
            'description' => 'required',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date',
            'status' => 'max:45',
            'necessite' => '',
            'facture' => 'nullable',
        ]);

        $tache = Tache::create($request->all());

        return response()->json(['tache' => $tache], Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'idCollaborateur' => 'required|exists:users,idCollaborateur',
            'idClient' => 'required|exists:clients,idClient',
            'description' => 'required',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date',
            'status' => 'max:45',
            'necessite' => 'required',
            'facture' => 'nullable',
        ]);

        $tache = Tache::find($id);

        if (!$tache) {
            return response()->json(['message' => 'Tache not found'], Response::HTTP_NOT_FOUND);
        }

        $oldComment = $tache->comment;

        $requestData = $request->except('comment');

        $requestData['comment'] = $oldComment;

        $tache->update($requestData);

        return response()->json(['tache' => $tache], Response::HTTP_OK);
    }



    public function destroy($id)
    {
        $tache = Tache::find($id);

        if (!$tache) {
            return response()->json(['message' => 'Tache not found'], Response::HTTP_NOT_FOUND);
        }

        // Delete associated comments
        $tache->comments()->delete();

        // Now delete the Tache record
        $tache->delete();

        return response()->json(['message' => 'Tache deleted successfully'], Response::HTTP_OK);
    }
}
