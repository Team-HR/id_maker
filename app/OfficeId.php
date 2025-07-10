<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OfficeId extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'picture',
        'position',
        'department',
        'configs',
    ];

    protected $casts = [
        'configs' => 'array', // Automatically cast JSON to array
    ];
}
