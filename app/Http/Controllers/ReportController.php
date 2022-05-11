<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Ch;
use App\Models\Eu;
use App\Models\Gcc;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function list()
    {
        $ch = Ch::all();
        $eu = Eu::all();
        $gcc = Gcc::all();
        // $allItems = new \Illuminate\Database\Eloquent\Collection;
        // $allItems = $allItems->merge($ch);
        // $allItems = $allItems->merge($eu);
        $allItems = collect($ch)->merge($gcc)->merge($eu);
        $allItems->sortBy('created_at', SORT_REGULAR, true);
        return Inertia::render('Dossiers/Index', [
            'list' => $allItems
        ]);
    }
}
