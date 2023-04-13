<?php

namespace App\Http\Controllers;

use App\Models\NewRequest;
use App\Models\User;
use App\Notifications\CaNewRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class NewRequestController extends Controller
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
    public function create()
    {
        //
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
        // $user = User::find(1);
        $user = User::first();
        // dd($user);
        
        //$row = NewRequest::create($data);

        //$user->notify(new CaNewRequest("hello"));
        // dd(Notification::send($user, new CaNewRequest('hey')));
        Notification::sendNow($user, new CaNewRequest('hey'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\NewRequest  $newRequest
     * @return \Illuminate\Http\Response
     */
    public function show(NewRequest $newRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\NewRequest  $newRequest
     * @return \Illuminate\Http\Response
     */
    public function edit(NewRequest $newRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\NewRequest  $newRequest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, NewRequest $newRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\NewRequest  $newRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(NewRequest $newRequest)
    {
        //
    }
}
