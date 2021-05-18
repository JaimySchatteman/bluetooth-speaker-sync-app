<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Arne Naessens',
            'email' => 'arne@gmail.com',
            'password' => Hash::make('password'),
            'musicroom_id' => 1
        ]);
        DB::table('users')->insert([
            'name' => 'Nel Lisabeth',
            'email' => 'nel@gmail.com',
            'password' => Hash::make('password'),
            'musicroom_id' => 1
        ]);
    }
}
