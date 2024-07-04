<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Http\Response;

class ClientsController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        return response()->json(['clients' => $clients], Response::HTTP_OK);
    }

    public function show($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['client' => $client], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required',
            'email' => 'email',
            'status' => 'max:45',
        ]);

        $client = Client::create($request->all());

        return response()->json(['client' => $client], Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'libelle' => 'required',
            'email' => 'email',
            'status' => 'max:45',
        ]);

        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], Response::HTTP_NOT_FOUND);
        }

        $client->update($request->all());

        return response()->json(['client' => $client], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], Response::HTTP_NOT_FOUND);
        }

        $client->delete();

        return response()->json(['message' => 'Client deleted successfully'], Response::HTTP_OK);
    }
}
