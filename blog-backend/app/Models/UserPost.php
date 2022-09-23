<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPost extends Model
{
    use HasFactory;
    protected $fillable=[
        'post_id',
        'user_id'
    ];
    public function author()
   {
       return $this->belongsTo(User::class);
   }
   public function post()
   {
       return $this->belongsTo(Post::class);
   }   
}
