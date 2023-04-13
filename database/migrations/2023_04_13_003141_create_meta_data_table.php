<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMetaDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meta_data', function (Blueprint $table) {
            $table->id();
            $table->string('procedure');
            $table->string('country');
            $table->string('Product');
            $table->string('agencyCode');
            $table->string('uuid');
            $table->string('trackingNumber');
            $table->string('applicant');
            $table->string('inn');
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
        Schema::dropIfExists('meta_data');
    }
}
