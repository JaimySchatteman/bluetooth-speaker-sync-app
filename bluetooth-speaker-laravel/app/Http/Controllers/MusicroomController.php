<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Musicroom;

class MusicroomController extends Controller
{
    public function index(){
        return Musicroom::all();
    }

    public function show($id)
    {
        return Musicroom::findOrFail($id);
    }

    public function create(Request $request)
    {
        return Musicroom::firstOrCreate(['title' => $request->title]);
    }

    public function destroy($id)
    {
        $user = Musicroom::findOrFail($id);
        $user->delete();

        return response(204);
    }
}
