<?php

namespace App\GraphQL\Mutations;
use App\Models\Comment;
final class UploadComment
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $file=$args['file_path'];
        $path=$file->storePublicly('public/comments');
        $path=substr($path,7);
        $comment=Comment::find($args['id']);
        $comment->update(['file_path'=>$path]);
        return $comment;
    }
}
