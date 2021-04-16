<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //\App\Models\User::factory(10)->create();
        $this->call(MusicroomSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(QueuesSeeder::class);
        $this->call(TracksSeeder::class);
        $this->call(Queues_TracksSeeder::class);
        
    }
}
