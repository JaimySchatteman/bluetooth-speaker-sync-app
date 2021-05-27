<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Models\Track;

class TrackSend implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $track;
    public $queue_id;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Track $track, $queue_id)
    {
        $this->track = $track;
        $this->queue_id = $queue_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('track.'.$this->queue_id);
    }

    /*public function broadcastWith()
    {
        return ["track" => $this->track];
    }

    public function broadcastAs() 
    {
        return 'track';
    }*/
}
