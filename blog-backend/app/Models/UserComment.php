<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserComment extends Model
{
    use HasFactory;
    protected $fillable=[
        'user_id',
        'comment_id'
    ];
    public function author()
   {
       return $this->belongsTo(User::class);
   }
   public function comment()
   {
       return $this->belongsTo(Comment::class);
   }   
}
