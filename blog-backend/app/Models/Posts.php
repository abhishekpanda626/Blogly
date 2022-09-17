<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Posts extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'body',
        'file_path'
    ];
    public function comments(): HasMany
    {
        return $this->hasMany(Comments::class,'post_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }

}
