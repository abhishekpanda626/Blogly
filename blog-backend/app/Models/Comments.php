<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Comments extends Model
{
    use HasFactory;
    protected $fillable = [
        'comment',
        'file_path'
    ];
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function post(): BelongsTo
    {
        return $this->belongsTo(Posts::class);

    }
}
