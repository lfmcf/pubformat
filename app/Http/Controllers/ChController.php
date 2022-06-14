<?php

namespace App\Http\Controllers;

use App\Models\Ch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;

class ChController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ch = Ch::orderBy('created_at', 'DESC')->get();
        return Inertia::render('Ch/Index', [
            'ch' => $ch
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Ch/Create');
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
        
        $row = Ch::create($data);

        // $generalInformation = array(
        //     'Responsable',
        //     'Event Name',
        //     'Reference of Deficiency Letter',
        //     'Product Name',
        //     'Substance Name',
        //     'Chrono N/Dossier Reference',
        //     'Documents Count',
        //     'Sending Date',
        //     'Deadline',
        //     'Status',
        //     'Type',
        //     'Action'
        // );
        // $sequenceInformation = array(
        //     'Submission Country',
        //     'Application Number',
        //     'Application Type',
        //     'DMF Number',
        //     'PMF Number',
        //     'Applicant',
        //     'Agency Code',
        //     'Galenic Form EN & DE/FR/IT',
        //     'Invented Name',
        //     'INN',
        //     'Article 13 TPA',
        //     'Sequence',
        //     'Related Sequence',
        //     'Submission Description'
        // );
        // $metadate = array(
        //     'Indication',
        //     'Drug substance Name',
        //     'Drug Substance Manufacturer',
        //     'Drug Product',
        //     'Dosage Form',
        //     'Manufacturer',
        //     'Excipient / Compendial Excipient'
        // );

        // $spreadsheet = new Spreadsheet();
        // $sheet = $spreadsheet->getActiveSheet();
        // $sheet->setTitle('GENERAL INFORMATION');
        // $sheet->getStyle('1:1')->getFont()->setBold(true);

        // $sheet->fromArray($generalInformation, NULL, 'A1');

        // $sheet->fromArray([
        //     $request->responsable,
        //     $request->eventName,
        //     $request->referenceDeficiencyLetter,
        //     $request->ProductNameFini,
        //     $request->substanceNameActive,
        //     $request->dossierReference,
        //     $request->documentsNumber,
        //     date("d-m-Y", strtotime($request->demandeDate)),
        //     date("d-m-Y", strtotime($request->deadline)),
        //     $request->status,
        //     $request->type,
        //     $request->action
        // ], NULL, 'A2');

        // $spreadsheet->createSheet();
        // $spreadsheet->setActiveSheetIndex(1);
        // $sheet = $spreadsheet->getActiveSheet()->setTitle('SEQUENCE INFORMATION');
        // $sheet->fromArray($sequenceInformation, NULL, 'A1');

        // $sheet->fromArray([
        //     $request->submissionCountry,
        //     $request->applicationNumber,
        //     $request->applicationType,
        //     $request->dmfNumber,
        //     $request->pmfNumber,
        //     $request->applicant,
        //     $request->agencyCode,
        //     $request->galenic,
        //     $request->inventedName,
        //     $request->inn,
        //     $request->article,
        //     $request->sequence,
        //     $request->relatedSequence,
        //     $request->submissionDescription
        // ], NULL, 'A2');

        // $spreadsheet->createSheet();
        // $spreadsheet->setActiveSheetIndex(2);
        // $sheet = $spreadsheet->getActiveSheet()->setTitle('PRODUCT INFORMATION');
        // $sheet->fromArray($metadate, NULL, 'A1');

        // $sheet->fromArray([
        //     $request->indication,
        //     "",
        //     "",
        //     "",
        //     $request->dosageForm,
        //     $request->manufacturer,
        //     $request->excipient,
        // ]);

        // foreach ($request->drugSubstanceName as $cnt => $dstn) {
        //     $cnt += 2;
        //     $sheet->setCellValue('B' . $cnt, $dstn);
        // }

        // foreach ($request->substanceManufacturer as $cn => $smf) {
        //     $cn += 2;
        //     $sheet->setCellValue('C' . $cn, $smf);
        // }

        // foreach ($request->drugProduct as $c => $dp) {
        //     $c += 2;
        //     $sheet->setCellValue('D' . $c, $dp);
        // }

        // $writer = new Xlsx($spreadsheet);
        // $writer->save("ch_execl");
        
        // return redirect()->to("location: mailto:support@ekemia.com");
        // mailto:"info@example.com";
        return redirect('/dossiers')->with('message', 'Votre formulaire a bien été soumis');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ch  $ch
     * @return \Illuminate\Http\Response
     */
    public function show(Ch $ch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ch  $ch
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $ch = Ch::findOrfail($id);
        return Inertia::render('Ch/Edit', [
            'ch' => $ch
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ch  $ch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $ch = Ch::findOrfail($request->id);
        $ch->responsable = $request->responsable;
        $ch->eventName = $request->eventName;
        $ch->referenceDeficiencyLetter = $request->referenceDeficiencyLetter;
        $ch->ProductNameFini = $request->ProductNameFini;
        $ch->substanceNameActive = $request->substanceNameActive;
        $ch->dossierReference = $request->dossierReference;
        $ch->documentsNumber = $request->documentsNumber;
        $ch->demandeDate = $request->demandeDate;
        $ch->deadline = $request->deadline;
        $ch->status = $request->status;
        $ch->type = $request->type;
        $ch->action = $request->action;
        $ch->submissionCountry = $request->submissionCountry;
        $ch->applicationNumber = $request->applicationNumber;
        $ch->applicationType = $request->applicationType;
        $ch->dmfNumber = $request->dmfNumber;
        $ch->pmfNumber = $request->pmfNumber;
        $ch->applicant = $request->applicant;
        $ch->agencyCode = $request->agencyCode;
        $ch->galenic = $request->galenic;
        $ch->inventedName = $request->inventedName;
        $ch->inn = $request->inn;
        $ch->article = $request->article;
        $ch->sequence = $request->sequence;
        $ch->relatedSequence = $request->relatedSequence;
        $ch->submissionDescription = $request->submissionDescription;
        $ch->drugSubstanceName = $request->drugSubstanceName ? json_decode($request->drugSubstanceName) : $request->drugSubstanceName;
        $ch->substanceManufacturer = $request->substanceManufacturer ? json_decode($request->substanceManufacturer) : $request->substanceManufacturer ;
        $ch->drugProduct = $request->drugProduct ? json_decode($request->drugProduct) : $request->drugProduct;
        $ch->dosageForm = $request->dosageForm;
        $ch->manufacturer = $request->manufacturer;
        $ch->excipient = $request->excipient;
        $ch->formstatus = $request->formstatus;

        $ch->save();
        
        return redirect('/dossiers')->with('message', 'Data has been saved successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ch  $ch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ch $ch)
    {
        //
    }
}
