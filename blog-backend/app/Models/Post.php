<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\PostComment;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'content', 'file_path'
    ];
    public function comment():HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function author():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
