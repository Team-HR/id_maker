<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficeId extends Model
{
    protected $fillable = [
        'user_id',
        'firstname',
        'lastname',
        'picture',
        'position',
        'department',
        'configs',
        'status'
    ];

    protected $casts = [
        'configs' => 'array', // Automatically cast JSON to array
    ];
}
