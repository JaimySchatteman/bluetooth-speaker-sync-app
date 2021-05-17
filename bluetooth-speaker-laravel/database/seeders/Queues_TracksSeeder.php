<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Queues_TracksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        
        $tracks = \App\Models\Track::all();
        \App\Models\Queue::all()->each(function ($queue) use ($tracks) { 
            $queue->tracks()->attach(
                $tracks->random(rand(1,1))->pluck('id')->toArray()
            ); 
        });
    }
}
