<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MusicroomController;
use App\Http\Controllers\TrackController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
//Login/Register/Logout API
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/me', function(Request $request) {
        return auth()->user();
    });

    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

// users API
Route::get('users', [UserController::class, 'index']);
 Route::get('users/{id}', [UserController::class, 'show']);
// Route::put('users/{id}', [UserController::class, 'update']);
// Route::post('users', [UserController::class, 'create']);
 Route::delete('users/{id}', [UserController::class, 'destroy']);




//Musicroom API
Route::get('/musicrooms', [MusicroomController::class, 'index']);
Route::get('/musicroom/{id}', [MusicroomController::class, 'show']);

Route::post('/musicroom', [MusicroomController::class, 'create']);

Route::post('/musicroom/{id}/startAt', [MusicroomController::class, 'startPlaylistAt']);
Route::post('/musicroom/{id}/pauzedAt', [MusicroomController::class, 'pauzedAt']);

Route::post('/musicroom/{id}', [MusicroomController::class, 'addUser']);
Route::delete('/musicroom/{id}/user/{user_id}', [MusicroomController::class, 'destroyUser']);

Route::delete('/musicroom/{id}', [MusicroomController::class, 'destroy']);
Route::delete('/musicroom/{id}/track/{track_id}', [MusicroomController::class, 'destroyTrack']);


//Track API
Route::post('/track', [TrackController::class, 'create']);
Route::get('/track', [TrackController::class, 'index']);

