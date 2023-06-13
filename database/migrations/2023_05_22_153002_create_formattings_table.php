<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormattingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formattings', function (Blueprint $table) {
            $table->id();
            $table->string('region')->nullable();
            $table->string('coredoc')->nullable();
            $table->string('dossier_contact')->nullable();
            $table->string('object')->nullable();
            $table->string('dossier_type')->nullable();
            $table->string('product_name')->nullable();
            $table->string('substance_name')->nullable();
            $table->string('country')->nullable();
            $table->string('deficiency_letter')->nullable();
            $table->string('chrono')->nullable();
            $table->integer('document_count')->nullable();
            $table->text('remarks')->nullable();
            $table->dateTime('request_date')->nullable();
            $table->dateTime('deadline')->nullable();
            $table->dateTime('adjusted_deadline')->nullable();
            $table->text('delivery_remarks')->nullable();
            $table->dateTime('review_request_date')->nullable();
            $table->dateTime('review_deadline')->nullable();
            $table->text('delivery_comment')->nullable();
            $table->string('delivery_version')->nullable();
            $table->string('correction_request')->nullable();
            $table->string('correction_origin')->nullable();
            $table->string('document')->nullable();
            $table->text('document_remarks')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('formattings');
    }
}
