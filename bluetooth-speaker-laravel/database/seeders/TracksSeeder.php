<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class TracksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 
        DB::table('tracks')->insert([
            'url' => 'https://www.youtube.com/watch?v=iywaBOMvYLI&ab_channel=systemofadownVEVO',
            'title' => 'System Of A Down - Toxicity ',
            'thumbnail' => 'test'
        ]);
    }
}
