<?php

namespace App\Http\Controllers;

use App\Models\Eu;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $row = Eu::create($request->all());
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
    public function edit(Eu $eu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Eu  $eu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Eu $eu)
    {
        //
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
