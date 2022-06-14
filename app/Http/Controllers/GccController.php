<?php

namespace App\Http\Controllers;

use App\Models\Gcc;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class GccController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Gcc/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $gcc = Gcc::orderBy('created_at', 'DESC')->get();
        return Inertia::render('Gcc/Create', [
            'gcc' => $gcc
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['drugSubstanceName'] = json_encode($request->drugSubstanceName);
        $data['substanceManufacturer'] = json_encode($request->substanceManufacturer);
        $data['drugProduct'] = json_encode($request->drugProduct);
        $row = Gcc::create($data);

        $generalInformation = array(
            'Responsable',
            'Event Name',
            'Concerned Country',
            'Reference of deficiency letter',
            'Product Name',
            'Substance Name',
            'Chrono N/Dossier Reference',
            'Documents Count',
            'Sending Date',
            'Deadline',
            'Status',
            'Type',
            'Action'
        );
        $sequenceInformation = array(
            'Submission Country',
            'ATC',
            'Submission Type',
            'Procedure Tracking Number',
            'Submission Unit',
            'Agency Code',
            'Procedure Type',
            'Invented Name',
            'INN',
            'Sequence',
            'Related Sequence',
            'Submission Description'
        );
        $metadate = array(
            'Indication',
            'Drug substance Name',
            'Drug Substance Manufacturer',
            'Drug Product',
            'Dosage Form',
            'Manufacturer',
            'Excipient / Compendial Excipient'
        );

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('GENERAL INFORMATION');
        $sheet->getStyle('1:1')->getFont()->setBold(true);

        $sheet->fromArray($generalInformation, NULL, 'A1');

        $sheet->fromArray([
            $request->responsable,
            $request->eventName,
            $request->concernedCountry,
            $request->referenceDeficiencyLetter,
            $request->ProductNameFini,
            $request->substanceNameActive,
            $request->dossierReference,
            $request->documentsNumber,
            date("d-m-Y", strtotime($request->demandeDate)),
            date("d-m-Y", strtotime($request->deadline)),
            $request->status,
            $request->type,
            $request->action
        ], NULL, 'A2');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(1);
        $sheet = $spreadsheet->getActiveSheet()->setTitle('SEQUENCE INFORMATION');
        $sheet->fromArray($sequenceInformation, NULL, 'A1');

        $sheet->fromArray([
            $request->submissionCountry,
            $request->atc,
            $request->submissionType,
            $request->trackingNumber,
            $request->submissionUnit,
            $request->agencyCode,
            $request->procedureType,
            $request->inventedName,
            $request->inn,
            $request->sequence,
            $request->relatedSequence,
            $request->submissionDescription
        ], NULL, 'A2');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(2);
        $sheet = $spreadsheet->getActiveSheet()->setTitle('PRODUCT INFORMATION');
        $sheet->fromArray($metadate, NULL, 'A1');

        $sheet->fromArray([
            $request->indication,
            "",
            "",
            "",
            $request->dosageForm,
            $request->manufacturer,
            $request->excipient,
        ]);

        foreach ($request->drugSubstanceName as $cnt => $dstn) {
            $cnt += 2;
            $sheet->setCellValue('B' . $cnt, $dstn);
        }

        foreach ($request->substanceManufacturer as $cn => $smf) {
            $cn += 2;
            $sheet->setCellValue('C' . $cn, $smf);
        }

        foreach ($request->drugProduct as $c => $dp) {
            $c += 2;
            $sheet->setCellValue('D' . $c, $dp);
        }

        $writer = new Xlsx($spreadsheet);
        $writer->save("ch_execl");
        return redirect('/dossiers')->with('message', 'Votre formulaire a bien été soumis');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Gcc  $gcc
     * @return \Illuminate\Http\Response
     */
    public function show(Gcc $gcc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Gcc  $gcc
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $gcc = Gcc::findOrfail($id);
        return Inertia::render('Gcc/Edit', [
            'gcc' => $gcc
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Gcc  $gcc
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $gcc = Gcc::findOrfail($request->id);
        $gcc->responsable = $request->responsable;
        $gcc->eventName = $request->eventName;
        $gcc->concernedCountry = $request->concernedCountry;
        $gcc->referenceDeficiencyLetter = $request->referenceDeficiencyLetter;
        $gcc->ProductNameFini = $request->ProductNameFini;
        $gcc->substanceNameActive = $request->substanceNameActive;
        $gcc->dossierReference = $request->dossierReference;
        $gcc->documentsNumber = $request->documentsNumber;
        $gcc->demandeDate = $request->demandeDate;
        $gcc->deadline = $request->deadline;
        $gcc->status = $request->status;
        $gcc->type = $request->type;
        $gcc->action = $request->action;
        $gcc->submissionCountry = $request->submissionCountry;
        $gcc->atc = $request->atc;
        $gcc->submissionType = $request->submissionType;
        $gcc->trackingNumber = $request->trackingNumber;
        $gcc->submissionUnit = $request->submissionUnit;
        $gcc->agencyCode = $request->agencyCode;
        $gcc->procedureType = $request->procedureType;
        $gcc->inventedName = $request->inventedName;
        $gcc->inn = $request->inn;
        $gcc->sequence = $request->sequence;
        $gcc->relatedSequence = $request->relatedSequence;
        $gcc->submissionDescription = $request->submissionDescription;
        $gcc->indication = $request->indication;
        $gcc->drugSubstanceName = $request->drugSubstanceName ? json_decode($request->drugSubstanceName) : $request->drugSubstanceName;
        $gcc->substanceManufacturer = $request->substanceManufacturer ? json_decode($request->substanceManufacturer) : $request->substanceManufacturer;
        $gcc->drugProduct = $request->drugProduct ? json_decode($request->drugProduct) : $request->drugProduct;
        $gcc->dosageForm = $request->dosageForm;
        $gcc->manufacturer = $request->manufacturer;
        $gcc->excipient = $request->excipient;
        $gcc->formstatus = $request->formstatus;

        $gcc->save();

        return redirect('/dossiers')->with('message', 'Votre formulaire a bien été modifié');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Gcc  $gcc
     * @return \Illuminate\Http\Response
     */
    public function destroy(Gcc $gcc)
    {
        //
    }
}
