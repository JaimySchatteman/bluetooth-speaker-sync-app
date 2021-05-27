<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;

    protected $fillable = [
        'musicroom_id',
        'started_playing_at_time',
        'pauzed_at_time'
    ];

    public function musicroom()
    {
        return $this->belongsTo(Musicroom::class);
    }

    public function tracks()
    {
        return $this->belongsToMany(Track::class);
    }
}
