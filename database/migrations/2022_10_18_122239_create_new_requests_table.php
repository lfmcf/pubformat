<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('new_requests', function (Blueprint $table) {
            $table->id();
            $table->string('form')->nullable();
            $table->string('region')->nullable();
            $table->string('responsable')->nullable();
            $table->string('eventName')->nullable();
            $table->string('ProductNameFini')->nullable();
            $table->string('substanceNameActive')->nullable();
            $table->dateTime('deadline')->nullable();
            $table->string('type')->nullable();
            $table->string('dossierReference')->nullable();
            $table->string('referenceDeficiencyLetter')->nullable();
            $table->boolean('coreDoc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('new_requests');
    }
}
