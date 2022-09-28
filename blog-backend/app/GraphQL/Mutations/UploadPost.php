<?php

namespace App\GraphQL\Mutations;
use App\Models\Post;
final class UploadPost
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $file=$args['file_path'];
        $path=$file->storePublicly('public/posts');
        $path=substr($path,7);
        $post=Post::find($args['id']);
        $post->update(['file_path'=>$path]);
        return $post;
    }
}
