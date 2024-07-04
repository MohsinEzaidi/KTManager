<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    use HasFactory;
    protected $fillable = [
        'idCollaborateur',
        'idClient',
        "idProjet",
        'description',
        'dateDebut',
        'dateFin',
        'idStatus',
        'facture',
        'necessite',
        'comment'
    ];
    protected $primaryKey = 'idTache';
    public function user()
    {
        return $this->belongsTo(User::class, 'idCollaborateur');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'idClient');
    }

    public function projet()
    {
        return $this->belongsTo(Projet::class, 'idProjet');
    }
    public function status()
    {
        return $this->belongsTo(Status::class, 'idStatus');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'idTache', 'idTache');
    }
}
