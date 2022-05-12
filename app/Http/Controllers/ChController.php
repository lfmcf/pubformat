<?php

namespace App\Http\Controllers;

use App\Models\Ch;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $row = Ch::create($request->all());
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
    public function edit(Ch $ch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ch  $ch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ch $ch)
    {
        //
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
