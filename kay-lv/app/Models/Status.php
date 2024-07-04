<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    protected $fillable=["etape","dateDebut","dateFin"];
    protected $primaryKey = 'idStatus';
    public function taches()
    {
        return $this->hasMany(Tache::class, 'status');
    }
}
