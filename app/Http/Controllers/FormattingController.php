<?php

namespace App\Http\Controllers;

use App\Models\Formatting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Continent;
use App\Notifications\CaNewRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;

class FormattingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $region = $request->query('region');
        if($region == "EU") {
            $cc = Continent::where('continent', 'europe')->first('countries');
        }else if ($region == "Asia") {
            $cc = Continent::where('continent', 'asia')->first('countries');
        }else if ($region == "GCC") {
            $cc = Continent::where('continent', 'gcc')->first('countries');
        }
        
        $countries = json_decode($cc->countries);
        return Inertia::render('formatting/create', [
            'countries' => $countries
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
        
        $formatting = new Formatting();
        $formatting->region = $request->region;
        $formatting->coredoc = $request->coredoc;
        $formatting->dossier_contact = $request->dossier_contact;
        $formatting->object = $request->object;
        $formatting->dossier_type = $request->dossier_type['value'];
        $formatting->product_name = $request->product_name;
        $formatting->substance_name = $request->substance_name;
        $formatting->country = $request->country['value'];
        $formatting->deficiency_letter = $request->deficiency_letter;
        $formatting->chrono = $request->chrono;
        $formatting->document_count = $request->document_count;
        $formatting->remarks = $request->remarks;
        $formatting->document = $request->document;
        $formatting->document_remarks = $request->document_remarks;
        $formatting->request_date = Carbon::now();
        $formatting->deadline = date('Y-m-d H:i:s', strtotime($request->deadline));
        $formatting->status = 'initiated';
        $formatting->save();
        $user = User::where('current_team_id', 2)->get();
        Notification::sendNow($user, new CaNewRequest('hello'));
        return redirect('/dashboard');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Formatting  $formatting
     * @return \Illuminate\Http\Response
     */
    public function show(Formatting $formatting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Formatting  $formatting
     * @return \Illuminate\Http\Response
     */
    public function edit(Formatting $formatting,$id)
    {
        $formatting = Formatting::findOrfail($id);
        if($formatting->region == "EU") {
            $cc = Continent::where('continent', 'europe')->first('countries');
        }else if ($formatting->region == "Asia") {
            $cc = Continent::where('continent', 'asia')->first('countries');
        }else if ($formatting->region == "GCC") {
            $cc = Continent::where('continent', 'gcc')->first('countries');
        }

        $countries = json_decode($cc->countries);

        return Inertia::render('formatting/edit', [
            'countries' => $countries,
            'formatting' => $formatting
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Formatting  $formatting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Formatting $formatting)
    {
        $formatting = Formatting::findOrfail($request->id);
        if($request->status === 'initiated') 
        {
            $formatting->adjusted_deadline = $request->adjusted_deadline;
            $formatting->status = 'submitted';
            $formatting->save();
            $user = User::where('current_team_id', 3)->get();
            Notification::sendNow($user, new CaNewRequest('hello'));
            return redirect('/dashboard');
        }
    }

    public function comfirm(Request $request)
    {
        $formatting = Formatting::findOrfail($request->id);
        $formatting->adjusted_deadline = $request->adjusted_deadline;
        $formatting->status = 'submitted';
        $formatting->save();
        $user = User::where('current_team_id', 3)->get();
        Notification::sendNow($user, new CaNewRequest('hello'));
        return redirect('/dashboard');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Formatting  $formatting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Formatting $formatting)
    {
        //
    }
}
