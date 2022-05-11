<?php

namespace App\Http\Controllers;

use App\Models\Gcc;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $row = Gcc::create($request->all());
        return redirect('gcc-index')->with('message', 'Votre formulaire a bien été soumis');
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
    public function edit(Gcc $gcc)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Gcc  $gcc
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gcc $gcc)
    {
        //
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
