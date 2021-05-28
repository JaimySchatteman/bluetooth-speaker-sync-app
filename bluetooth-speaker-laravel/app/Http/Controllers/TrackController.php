<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Track;
use App\Events\TrackSend;
use App\Models\Queue;

class TrackController extends Controller
{
    public function index()
    {
        return Track::all();
    }

    public function create(Request $request)
    {
        $track =  Track::firstOrCreate(['url' => $request->url, 'title' => $request->title, 'thumbnail' => $request->thumbnail]);

        $queue = Queue::findOrFail($request->queue_id);
        $track->queues()->attach($queue);

        broadcast(new TrackSend($track, $request->queue_id))->toOthers();
        
        return $track;
    }
}
