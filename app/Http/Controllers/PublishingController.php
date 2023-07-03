<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use App\Models\Product;
use App\Models\Publishing;
use App\Models\PublishingCh;
use App\Models\PublishingMrp;
use App\Models\User;
use App\Models\MetaData;
use Illuminate\Support\Facades\DB;
use App\Models\Continent;
use App\Notifications\CaNewRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;

class PublishingController extends Controller
{
    public function create(Request $request)
    {
        $region = $request->query('region');

        $procedure = $request->query('procedure');
        $country = $request->query('country');
        $product = $request->query('product');
        if ($region == "EU") {
            if ($procedure == 'Nationale' || $procedure == 'Centralized') {
                $md = MetaData::where([
                    ['Product', '=', $product],
                    ['procedure', '=', $procedure],
                    ['country', '=', $country['value']]
                ])->first();
                if ($md) {
                    return Inertia::render('publishing/create', [
                        'metadata' => $md,
                        'countries' => $country['value'],
                        'products' => $product
                    ]);
                }
            } else {
                $listmd = [];
                for ($i = 0; $i < count($country); $i += 2) {
                    // dd($country[$i]['label']);
                    $md = MetaData::where([
                        ['Product', '=', $product],
                        ['procedure', '=', $procedure],
                        ['country', '=', $country[$i]['label']]
                    ])->first();
                    if ($md) {
                        array_push($listmd, $md);
                    }
                }
                return Inertia::render('publishing/createmrp', [
                    'metadata' => $listmd,
                ]);
            }
        } else if ($region == "CH") {

            $md = MetaData::where([
                ['Product', '=', $product],
                ['procedure', '=', $procedure],
                ['country', '=', $country['value']]
            ])->first();

            if ($md) {
                return Inertia::render('publishing/createch', [
                    'metadata' => $md,
                    'countries' => $country['value'],
                    'products' => $product
                ]);
            }
        } else if ($region == "GCC") {
            $md = MetaData::where([
                ['Product', '=', $product],
                ['procedure', '=', $procedure],
                ['country', '=', $country['value']]
            ])->first();

            if ($md) {
                return Inertia::render('publishing/creategcc', [
                    'metadata' => $md,
                    'countries' => $country['value'],
                    'products' => $product
                ]);
            }
        }

        // $region = $request->query('region');
        // $products = Product::all();
        // if($region == "Eu") {
        //     $cc = Continent::where('continent', 'europe')->first('countries');
        //     $countries = json_decode($cc->countries);
        //     return Inertia::render('publishing/create', [
        //         'countries' => $countries,
        //         'products' => $products
        //     ]);
        // }else if ($region == "Asia") {
        //     $cc = Continent::where('continent', 'asia')->first('countries');
        // }else if ($region == "GCC") {
        //     $cc = Continent::where('continent', 'gcc')->first('countries');
        //     $countries = json_decode($cc->countries);
        //     return Inertia::render('publishing/creategcc', [
        //         'countries' => $countries,
        //         'products' => $products
        //     ]);
        // }else if ($region == "CH"){
        //     return Inertia::render('publishing/createch');
        // }
    }

    public function getmetadata(Request $request)
    {
        $pro = $request->produit;
        $country = $request->country;
        $procedure = $request->procedure;

        $md = MetaData::where([
            ['Product', '=', $pro],
            ['procedure', '=', $procedure],
            ['country', '=', $country]
        ])->first();

        return response($md, 200);
    }

    public function store(Request $request)
    {
        $pub = new Publishing();
        $pub->form = $request->form;
        $pub->region = $request->region;
        $pub->procedure = $request->procedure;
        $pub->productName = $request->productName;
        $pub->dossier_contact = $request->dossier_contact;
        $pub->object = $request->object;
        $pub->country = $request->country;
        $pub->dossier_type = $request->dossier_type;
        $pub->dossier_count = $request->dossier_count;
        $pub->remarks = $request->remarks;
        $pub->uuid = $request->uuid;
        $pub->submission_type = $request->submission_type;
        $pub->submission_mode = $request->submission_mode;
        $pub->tracking = $request->tracking;
        $pub->submission_unit = $request->submission_unit;
        $pub->applicant = $request->applicant;
        $pub->agency_code = $request->agency_code;
        $pub->inn = $request->inn;
        $pub->sequence = $request->sequence;
        $pub->r_sequence = $request->r_sequence;
        $pub->submission_description = $request->submission_description;
        $pub->mtremarks = $request->mtremarks;
        $pub->indication = $request->indication;
        $pub->manufacturer = $request->manufacturer;
        $pub->drug_substance = $request->drug_substance;
        $pub->drug_substance_manufacturer = $request->drug_substance_manufacturer;
        $pub->drug_product = $request->drug_product;
        $pub->drug_product_manufacturer = $request->drug_product_manufacturer;
        $pub->dosage_form = $request->dosage_form;
        $pub->excipient = $request->excipient;
        $pub->doc = $request->doc;
        $pub->docremarks = $request->docremarks;
        $pub->invented_name = $request->invented_name;
        $pub->request_date = date('Y-m-d H:i:s', strtotime(Carbon::now()));
        $pub->deadline = date('Y-m-d H:i:s', strtotime($request->deadline));
        $pub->status = 'initiated';
        $pub->type = $request->query('type');
        $pub->save();

        if ($request->query('type') == 'submit') {
            $user = User::where('current_team_id', 2)->get();
            Notification::sendNow($user, new CaNewRequest('hello'));
            return redirect('/dashboard')->with('message', 'Your form has been successfully submitted');
        } else {
            return redirect('/dashboard')->with('message', 'Your form has been successfully saved');
        }
    }

    public function storeCh(Request $request)
    {
        $pub = new PublishingCh();
        $pub->form = $request->form;
        $pub->region = $request->region;
        $pub->procedure = $request->procedure;
        $pub->product_name = $request->product_name;
        $pub->dossier_contact = $request->dossier_contact;
        $pub->object = $request->object;
        $pub->country = $request->country;
        $pub->dossier_type = $request->dossier_type;
        $pub->document_count = $request->document_count;
        $pub->remarks = $request->remarks;
        $pub->tracking = $request->tracking;
        $pub->applicant = $request->applicant;
        $pub->agency_code = $request->agency_code;
        $pub->atc = $request->atc;
        $pub->submission_type = $request->submission_type;
        $pub->submission_mode = $request->submission_mode;
        $pub->invented_name = $request->invented_name;
        $pub->inn = $request->inn;
        $pub->sequence = $request->sequence;
        $pub->r_sequence = $request->r_sequence;
        $pub->uuid = $request->uuid;
        $pub->submission_description = $request->submission_description;
        $pub->mtremarks = $request->mtremarks;
        $pub->indication = $request->indication;
        $pub->manufacturer = $request->manufacturer;
        $pub->drug_substance = $request->drug_substance;
        $pub->drug_substance_manufacturer = $request->drug_substance_manufacturer;
        $pub->drug_product = $request->drug_product;
        $pub->dosage_form = $request->dosage_form;
        $pub->excipient = $request->excipient;
        $pub->doc = $request->doc;
        $pub->docremarks = $request->docremarks;
        $pub->request_date = date('Y-m-d H:i:s', strtotime(Carbon::now()));
        $pub->deadline = date('Y-m-d H:i:s', strtotime($request->deadline));
        $pub->status = 'initiated';
        $pub->galenic_form = $request->galenic_form;
        $pub->swissmedic = $request->swissmedic;
        $pub->galenic_name = $request->galenic_name;
        $pub->dmf = $request->dmf;
        $pub->pmf = $request->pmf;
        $pub->dmf_holder = $request->dmf_holder;
        $pub->pmf_holder = $request->pmf_holder;
        $pub->tpa = $request->tpa;
        $pub->application_type = $request->application_type;
        $pub->drug_product_manufacturer = $request->drug_product_manufacturer;
        $pub->type = $request->query('type');
        $pub->save();
        if ($request->query('type') == 'submit') {
            $user = User::where('current_team_id', 2)->get();
            Notification::sendNow($user, new CaNewRequest('hello'));
            return redirect('/dashboard')->with('message', 'Your form has been successfully submitted');
        } else {
            return redirect('/dashboard')->with('message', 'Your form has been successfully saved');
        }
    }

    public function storeMrp(Request $request)
    {
        $pub = new PublishingMrp();
        $pub->form = $request->form;
        $pub->region = $request->region;
        $pub->procedure = $request->procedure;
        $pub->product_name = $request->product_name;
        $pub->dossier_contact = $request->dossier_contact;
        $pub->object = $request->object;
        $pub->country = $request->country;
        $pub->dossier_type = $request->dossier_type;
        $pub->document_count = $request->document_count;
        $pub->remarks = $request->remarks;
        $pub->mt = $request->mt;
        $pub->indication = $request->indication;
        $pub->manufacturer = $request->manufacturer;
        $pub->drug_substance = $request->drug_substance;
        $pub->drug_product_manufacturer = $request->drug_product_manufacturer;
        $pub->dosage_form = $request->dosage_form;
        $pub->excipient = $request->excipient;
        $pub->doc = $request->doc;
        $pub->docremarks = $request->docremarks;
        $pub->deadline = $request->deadline;
        $pub->request_date = $request->request_date;
        $pub->type = $request->query('type');
        $pub->save();

        if ($request->query('type') == 'submit') {
            $user = User::where('current_team_id', 2)->get();
            Notification::sendNow($user, new CaNewRequest('hello'));
            return redirect('/dashboard')->with('message', 'Your form has been successfully submitted');
        } else {
            return redirect('/dashboard')->with('message', 'Your form has been successfully saved');
        }
    }
}
