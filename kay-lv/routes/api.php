<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FonctionsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProjetsController;
use App\Http\Controllers\StatusesController;
use App\Http\Controllers\TacheController;
use App\Http\Controllers\TachesController;
use App\Http\Controllers\Users;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('fonctions', FonctionsController::class);
Route::apiResource('users', UsersController::class);
Route::apiResource('projets', ProjetsController::class);
Route::get("projets/get-collaborateurs/{id}",[ProjetsController::class,"get_dev_team"]);
Route::get('projects/get-projects-by-collaborateur/{idCollaborateur}', [ProjetsController::class,"get_projects_by_collaborateur"]);

Route::apiResource('statuses', StatusesController::class);
Route::get("users/get-user-by-email/{login}",[UsersController::class,"get_user_by_email"]);
Route::apiResource('clients', ClientsController::class);
Route::apiResource('taches', TacheController::class);
Route::get('taches/taches-by-projet/{id}', [TacheController::class,"taches_by_project"]);
Route::get("taches/undone-tasks/{idProject}", [TacheController::class, "undone_tasks"]);
Route::get("taches/get-id-project/{id}",[TacheController::class,"get_id_project"]);
Route::get("taches/get-collaborateur-taches/{idCollaborateur}/{idProjet}",[TacheController::class,"get_collaborateur_taches"]);
Route::post("taches/add-comment",[TacheController::class,"add_comment"]);
Route::resource('comments', CommentController::class);
Route::get("tache/edit-data",[Controller::class,"tache_edit_data"]);
Route::get('projet/edit-data', [Controller::class,"projet_edit_data"]);
