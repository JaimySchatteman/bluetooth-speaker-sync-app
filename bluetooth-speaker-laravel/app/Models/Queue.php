<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;

    public function musicroom()
    {
        return $this->hasOne(Musicroom::class);
    }

    public function tracks()
    {
        return $this->belongsToMany(Track::class);
    }
}
