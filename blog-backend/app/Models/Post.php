<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Post extends Model
{
    use HasFactory;
    public function comments():HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function author():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
