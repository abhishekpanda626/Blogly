<?php

namespace App\GraphQL\Mutations;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
final class UserLogin
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $data = [
            'email' => $args["email"],
            'password' => $args["password"]
        ];
    $user= User::where('email', $args['email'])->first();
if(! $user || ! Hash::check($args['password'], $user->password))
{
    return response()->json([
        'error'=>["The Provided Credentials are Incorrect"]
    ],206);
}

return $user->createToken('user')->accessToken;;
    }
}
