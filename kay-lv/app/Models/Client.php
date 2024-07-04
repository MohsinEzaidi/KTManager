<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable = [
        'libelle',
        'email',
        'status',
    ];
    protected $primaryKey = 'idClient';
    public function taches()
    {
        return $this->hasMany(Tache::class, 'idClient');
    }
}
