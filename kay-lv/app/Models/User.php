<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'status',
        'email',
        'password',
        'idFonction',
    ];
    protected $primaryKey = 'idCollaborateur';
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function fonction()
    {
        return $this->belongsTo(Fonction::class, 'idFonction');
    }

    public function taches()
    {
        return $this->hasMany(Tache::class, 'idCollaborateur');
    }
    public function projets()
    {
        return $this->belongsToMany(Projet::class, 'taches', 'idCollaborateur', 'idProjet');
    }
}
