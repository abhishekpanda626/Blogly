<?php

namespace App\GraphQL\Mutations;
use App\Models\User;
final class UpdateUserAvatar
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $file=$args['avatar'];
        $path=$file->storePublicly('public/uploads');
        $path=substr($path,7);
        $user=User::find($args['id']);
        $user->update(['avatar'=>$path]);
        return $user;
       
    }
}
