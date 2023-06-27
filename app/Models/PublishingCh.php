<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class PublishingCh extends Model
{

    protected $connection = 'mongodb';
    protected $collection = 'publishingCh';
    use HasFactory;
}
