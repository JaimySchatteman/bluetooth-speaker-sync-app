<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        return User::with('musicroom')->findOrFail($id);
    }

    public function create(Request $request)
    {
        return User::firstOrCreate($request);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request);
        $user->save();

        return $user;
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response(204);
    }
}
