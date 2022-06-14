<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGccsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gccs', function (Blueprint $table) {
            $table->id();
            $table->string('responsable')->nullable();
            $table->string('eventName')->nullable();
            $table->string('concernedCountry')->nullable();
            $table->string('referenceDeficiencyLetter')->nullable();
            $table->string('ProductNameFini')->nullable();
            $table->string('substanceNameActive')->nullable();
            $table->string('dossierReference')->nullable();
            $table->integer('documentsNumber')->nullable();
            $table->date('demandeDate')->nullable();
            $table->date('deadline')->nullable();
            $table->string('status')->nullable();
            $table->string('type')->nullable();
            $table->string('action')->nullable();
            $table->string('submissionCountry')->nullable();
            $table->string('atc')->nullable();
            $table->string('submissionType')->nullable();
            $table->integer('trackingNumber')->nullable();
            $table->string('submissionUnit')->nullable();
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
        Schema::dropIfExists('gccs');
    }
}
