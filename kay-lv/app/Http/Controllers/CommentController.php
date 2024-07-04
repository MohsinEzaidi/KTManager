<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;


class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::all();
        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required',
            'idCollaborateur' => 'required|exists:users,idCollaborateur',
            'idTache' => 'required|exists:taches,idTache',
        ]);

        $comment = Comment::create($request->all());

        return response()->json($comment, 201);
    }

    public function show(Comment $comment)
    {
        return response()->json($comment);
    }

    public function update(Request $request, Comment $comment)
    {
        $request->validate([
            'comment' => 'required',
            'idCollaborateur' => 'required|exists:users,idCollaborateur',
            'idTache' => 'required|exists:taches,idTache',
        ]);

        $comment->update($request->all());

        return response()->json($comment);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->json(null, 204);
    }
}
