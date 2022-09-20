<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('user', function () {
    User::create([
        'name' => 'Jose Fonseca',
        'email' => 'myemail@email.com',
        'password' => bcrypt('123456789qq')
    ]);
})->describe('Create sample user');
