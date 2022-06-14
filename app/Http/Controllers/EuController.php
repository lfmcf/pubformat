<?php

namespace App\Http\Controllers;

use App\Models\Eu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class EuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eu = Eu::orderBy('created_at', 'DESC')->get();
        return Inertia::render('Eu/Index', [
            'eu' => $eu
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Eu/Create');
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
        $row = EU::create($data);

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
            'UUID',
            'Submission Type',
            'Submission Mode',
            'Procedure Tracking Number',
            'Submission Unit',
            'Applicant',
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
            $request->uuid,
            $request->submissionType,
            $request->submissionMode,
            $request->trackingNumber,
            $request->submissionUnit,
            $request->applicant,
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
     * @param  \App\Models\Eu  $eu
     * @return \Illuminate\Http\Response
     */
    public function show(Eu $eu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Eu  $eu
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $eu = Eu::findOrfail($id);
        return Inertia::render('Eu/Edit', [
            'eu' => $eu
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Eu  $eu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $eu = Eu::findOrfail($request->id);
        $eu->responsable = $request->responsable;
        $eu->eventName = $request->eventName;
        $eu->concernedCountry = $request->concernedCountry;
        $eu->referenceDeficiencyLetter = $request->referenceDeficiencyLetter;
        $eu->ProductNameFini = $request->ProductNameFini;
        $eu->substanceNameActive = $request->substanceNameActive;
        $eu->dossierReference = $request->dossierReference;
        $eu->documentsNumber = $request->documentsNumber;
        $eu->demandeDate = $request->demandeDate;
        $eu->deadline = $request->deadline;
        $eu->status = $request->status;
        $eu->type = $request->type;
        $eu->action = $request->action;
        $eu->submissionCountry = $request->submissionCountry;
        $eu->uuid = $request->uuid;
        $eu->submissionType = $request->submissionType;
        $eu->submissionMode = $request->submissionMode;
        $eu->trackingNumber = $request->trackingNumber;
        $eu->submissionUnit = $request->submissionUnit;
        $eu->applicant = $request->applicant;
        $eu->agencyCode = $request->agencyCode;
        $eu->procedureType = $request->procedureType;
        $eu->inventedName = $request->inventedName;
        $eu->inn = $request->inn;
        $eu->sequence = $request->sequence;
        $eu->relatedSequence = $request->relatedSequence;
        $eu->submissionDescription = $request->submissionDescription;
        $eu->indication = $request->indication;
        $eu->drugSubstanceName = $request->drugSubstanceName ? json_decode($request->drugSubstanceName) : $request->drugSubstanceName;
        $eu->substanceManufacturer = $request->substanceManufacturer ? json_decode($request->substanceManufacturer) : $request->substanceManufacturer;
        $eu->drugProduct = $request->drugProduct ? json_decode($request->drugProduct) : $request->drugProduct;
        $eu->dosageForm = $request->dosageForm;
        $eu->manufacturer = $request->manufacturer;
        $eu->excipient = $request->excipient;
        $eu->formstatus = $request->formstatus;
        
        $eu->save();

        return redirect('/dossiers')->with('message', 'Votre formulaire a bien été modifié');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Eu  $eu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Eu $eu)
    {
        //
    }
}
