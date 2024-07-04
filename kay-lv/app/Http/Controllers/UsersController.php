<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Make sure to import the User model
use GuzzleHttp\Psr7\Response;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with(["fonction", "taches", "projets:idProjet,libelle"])
            ->distinct()
            ->orderBy("prenom")
            ->get();

        return response()->json(['users' => $users]);
    }

    public function show($id)
    {
        $user = User::with(["fonction", "taches", "projets"])->find($id);

        if (!$user) {
            return response()->json(['message' => 'user not found'], 404);
        }

        return response()->json(['user' => $user], 200);
    }
    public function get_user_by_email($email)
    {
        $user = User::with("fonction")->where('email', $email)->first();

        if ($user) {
            return response()->json(['idCollaborateur' => $user->idCollaborateur, "fonction" => $user->fonction->libelle]);
        }

        // User not found or invalid credentials
        return response()->json(['error' => 'Invalid credentials']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // You can add validation for incoming data here
        $user = User::create($request->all());

        return response()->json(['user' => $user], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());

        return response()->json(['user' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
