<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// app/Http/Controllers/StatusesController.php
namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusesController extends Controller
{
    public function index()
    {
        $statuses = Status::all();

        return response()->json(['statuses' => $statuses], 200);
    }

    public function show($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Status not found'], 404);
        }

        return response()->json(['status' => $status], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'etabe' => 'required',
            'dateDebut' => 'required',
            'dateFin' => 'required',
        ]);

        $status = Status::create($request->all());

        return response()->json(['status' => $status], 201);
    }

    public function update(Request $request, $id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Status not found'], 404);
        }

        $status->update($request->all());

        return response()->json(['status' => $status], 200);
    }

    public function destroy($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json(['message' => 'Status not found'], 404);
        }

        $status->delete();

        return response()->json(['message' => 'Status deleted'], 200);
    }
}
