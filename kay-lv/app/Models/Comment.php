<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        "comment",
        "idCollaborateur",
        "idTache",
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idCollaborateur', 'idCollaborateur');
    }

    public function task()
    {
        return $this->belongsTo(Tache::class, 'idTache', 'idTache');
    }
}
