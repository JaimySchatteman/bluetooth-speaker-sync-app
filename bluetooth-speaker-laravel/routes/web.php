<?php

use App\Models\User;
use App\Events\WebSocketDemoEvent;
use Illuminate\Support\Facades\Route;

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

Route::get('/', 'MusicroomController@index');
Route::get('/musicroom/{id}', 'MusicroomController@show');

Route::delete('/musicroom/{id}', 'MusicroomController@destroy');
Route::delete('/musicroom/{musicroom_id}/tracks/{track_id}', 'MusicroomController@destroyTrack');

Route::post('/musicroom/{request}', 'MusicroomController@create');

Route::post('/track/{request}', 'TrackController@create');
