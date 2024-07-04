<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTachesTable extends Migration
{
    public function up()
    {
        Schema::create('taches', function (Blueprint $table) {
            $table->id('idTache');
            $table->foreignId('idCollaborateur')->references("idCollaborateur")->on("users");
            $table->foreignId('idClient')->references("idClient")->on("clients");
            $table->foreignId("idProjet")->references("idProjet")->on("projets");
            $table->foreignId("idStatus")->references("idStatus")->on("statues");
            $table->string('description');
            $table->text('comment')->nullable();
            $table->dateTime('dateDebut');
            $table->dateTime('dateFin');
            $table->string("necessite");
            $table->tinyInteger('facture');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('taches');
    }
}

