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

Route::get('/', function () {
    broadcast(new WebSocketDemoEvent('some data'));
    return User::with('musicroom')->findOrFail(1);
});
