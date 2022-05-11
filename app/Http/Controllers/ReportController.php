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

    public function dashboard() {

        $cch = count(Ch::all());
        $ceu = count(Eu::all());
        $cgcc = count(Gcc::all());

        $cdch = Ch::where('status', 'Livré')->count();
        $cdeu = Eu::where('status', 'Livré')->count();
        $cdgcc = Gcc::where('status', 'Livré')->count();

        $coch = Ch::where('status', 'En cours')->count();
        $coeu = Eu::where('status', 'En cours')->count();
        $cogcc = Gcc::where('status', 'En cours')->count();
        

        $all = $cch + $ceu + $cgcc;
        $livred = $cdch + $cdgcc + $cdeu;
        $ongoing = $coch + $coeu + $cogcc;

        return Inertia::render('Dashboard', [
            'all' => $all,
            'livred' => $livred,
            'ongoing' => $ongoing,
        ]);
    }
}
