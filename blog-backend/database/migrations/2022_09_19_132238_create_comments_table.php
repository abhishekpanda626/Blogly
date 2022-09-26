<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string("comment");
            $table->string("file_path")->nullable();
            $table->foreignId("user_id")->nullable();
            $table->foreignId("post_id")->nullable();
            $table->timestamps();
        });
        Schema::table('comments', function (Blueprint $table) {
            $table->foreign("user_id")->references('id')->on('users');
            $table->foreign("post_id")->references('id')->on('posts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
