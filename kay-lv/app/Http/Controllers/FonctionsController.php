<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fonction;
use Illuminate\Http\Response;

class FonctionsController extends Controller
{
    public function index()
    {
        $fonctions = Fonction::all();
        return response()->json(['fonctions' => $fonctions], Response::HTTP_OK);
    }

    public function show($id)
    {
        $fonction = Fonction::find($id);

        if (!$fonction) {
            return response()->json(['message' => 'Fonction not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['fonction' => $fonction], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|max:45',
            'status' => 'max:45',
        ]);

        $fonction = Fonction::create($request->all());

        return response()->json(['fonction' => $fonction], Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'libelle' => 'required|max:45',
            'status' => 'max:45',
        ]);

        $fonction = Fonction::find($id);

        if (!$fonction) {
            return response()->json(['message' => 'Fonction not found'], Response::HTTP_NOT_FOUND);
        }

        $fonction->update($request->all());

        return response()->json(['fonction' => $fonction], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $fonction = Fonction::find($id);

        if (!$fonction) {
            return response()->json(['message' => 'Fonction not found'], Response::HTTP_NOT_FOUND);
        }

        $fonction->delete();

        return response()->json(['message' => 'Fonction deleted successfully'], Response::HTTP_OK);
    }
}
