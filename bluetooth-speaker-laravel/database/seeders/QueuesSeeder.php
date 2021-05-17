<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class QueuesSeeder extends Seeder
{
    public function run()
    {
        DB::table('queues')->insert([   
            'musicroom_id' => 1
        ]);

    }
}
