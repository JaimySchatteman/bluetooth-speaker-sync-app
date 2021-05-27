<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQueuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('queues', function (Blueprint $table) {
            $table->id();

            //one-to-one musicroom
            $table->integer('started_playing_at_number')->default(0);
            $table->time('pauzed_at_time')->default(0);
            $table->unsignedBigInteger('musicroom_id')->nullable();
            $table->foreign('musicroom_id')->references('id')->on('musicrooms');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('queues');
    }
}
