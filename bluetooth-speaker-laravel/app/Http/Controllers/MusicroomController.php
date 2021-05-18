<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Musicroom;
use App\Models\Queue;
use Illuminate\Support\Facades\Log;

class MusicroomController extends Controller
{
    public function index(){
        return Musicroom::with('owner', 'users')->get();
    }

    //https://stackoverflow.com/questions/19852927/get-specific-columns-using-with-function-in-laravel-eloquent
    public function show($id)
    {
        return Musicroom::with('owner', 'users', 'queue.tracks')->findOrFail($id);
    }

    public function create(Request $request)
    {
        $musicroom =  Musicroom::firstOrCreate(['title' => $request->title, 'owner_id' => $request->owner_id]);
        $queue = Queue::create(['musicroom_id' => $musicroom->id]);

        return $musicroom;
    }

    public function destroy($id)
    {
        $musicroom = Musicroom::findOrFail($id);
        $musicroom->delete();

        return response(204);
    }

    //geen idee of dit juist is
    //https://appdividend.com/2018/05/17/laravel-many-to-many-relationship-example/
    public function destroyTrack($musicroom_id, $track_id){
        $queue = Queue::where('musicroom_id', $musicroom_id);

        $track = Track::findOrFail($track_id);

        $queue->tracks()->detach($track);

        return response(204);
    }
}
