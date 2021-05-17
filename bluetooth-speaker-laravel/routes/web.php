<?php

use App\Models\User;
use App\Events\WebSocketDemoEvent;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MusicroomController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/musicrooms', [MusicroomController::class, 'index']);
Route::get('/musicroom/{id}', [MusicroomController::class, 'show']);

Route::delete('/musicroom/{id}', 'MusicroomController@destroy');
Route::delete('/musicroom/{musicroom_id}/tracks/{track_id}', 'MusicroomController@destroyTrack');

Route::post('/musicroom/{request}', [MusicroomController::class, 'create']);

Route::post('/track/{request}', 'TrackController@create');
