<?php

namespace App\Models\Queue;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'title',
        'thumbnail'
    ];

    public function queues()
    {
        return $this->belongsToMany(Queue::class);
    }

}
