<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eus', function (Blueprint $table) {
            $table->id();
            $table->string('responsable')->nullable();
            $table->string('eventName')->nullable();
            $table->string('concernedCountry')->nullable();
            $table->string('referenceDeficiencyLetter')->nullable();
            $table->string('ProductNameFini')->nullable();
            $table->string('substanceNameActive')->nullable();
            $table->string('dossierReference')->nullable();
            $table->string('documentsNumber')->nullable();
            $table->dateTime('demandeDate')->nullable();
            $table->dateTime('deadline')->nullable();
            $table->string('status')->nullable();
            $table->string('type')->nullable();
            $table->string('action')->nullable();
            $table->string('submissionCountry')->nullable();
            $table->string('uuid')->nullable();
            $table->string('submissionType')->nullable();
            $table->string('submissionMode')->nullable();
            $table->string('trackingNumber')->nullable();
            $table->string('submissionUnit')->nullable();
            $table->string('applicant')->nullable();
            $table->string('agencyCode')->nullable();
            $table->string('procedureType')->nullable();
            $table->string('inventedName')->nullable();
            $table->string('inn')->nullable();
            $table->string('sequence')->nullable();
            $table->string('relatedSequence')->nullable();
            $table->string('submissionDescription')->nullable();
            $table->string('indication')->nullable();
            $table->json('drugSubstanceName')->nullable();
            $table->json('substanceManufacturer')->nullable();
            $table->json('drugProduct')->nullable();
            $table->string('dosageForm')->nullable();
            $table->string('manufacturer')->nullable();
            $table->string('excipient')->nullable();
            $table->string('formtype')->nullable();
            $table->string('formstatus')->nullable();
            $table->text('comments')->nullable();
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
        Schema::dropIfExists('eus');
    }
}
