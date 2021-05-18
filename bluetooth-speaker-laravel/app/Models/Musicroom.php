<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Musicroom extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'owner_id'
    ];

    public function owner(){
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->hasMany(User::class, 'musicroom_id');
    }

    public function queue()
    {
        return $this->hasOne(Queue::class, 'musicroom_id');
    }
}
