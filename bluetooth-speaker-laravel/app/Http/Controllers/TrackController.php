<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Track;
use App\Events\TrackSend;

class TrackController extends Controller
{
    public function create(Request $request)
    {
        $track =  Track::firstOrCreate(['url' => $request->url, 'title' => $request->title, 'thumbnail' => $request->url]);

        $queue = Queue::findOrFail($request->queue_id);
        $track->queues()->attach($queue);

        broadcast(new TrackSend($track));
        
        return $track;
    }
}
