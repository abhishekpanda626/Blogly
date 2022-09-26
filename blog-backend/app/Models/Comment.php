<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Comment extends Model
{
    use HasFactory;
    public function post():BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
    public function by() :BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
