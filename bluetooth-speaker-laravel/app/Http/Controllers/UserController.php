<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    protected static $rules = [
        'name' => 'required'
    ];

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
        return User::firstOrCreate(['name' => $request->name, 'email' => $request->email, 'password' => Hash::make($request->password)]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($request->password != null) {
            $request->password = Hash::make($request->password);
        }
        $user->update($request->all());
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
