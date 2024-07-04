<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;
    protected $fillable=["libelle","idCollaborateur"];
    protected $primaryKey = 'idProjet';
    public function user()
    {
        return $this->belongsTo(User::class, 'idCollaborateur');
    }

    public function taches()
    {
        return $this->hasMany(Tache::class, 'idProjet');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'taches', 'idProjet', 'idCollaborateur');
    }

}
