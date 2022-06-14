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

        $allItems = collect($ch)->merge($eu)->merge($gcc)->sortByDesc('created_at');
        $allItems = $allItems->values();
        
        return Inertia::render('Dossiers/Index', [
            'list' => $allItems
        ]);
    }

    public function dashboard() {

        $ch = Ch::all();
        $eu = Eu::all();
        $gcc = Gcc::all();
        $allItems = collect($ch)->merge($gcc)->merge($eu);

        $cch = count($ch );
        $ceu = count($eu);
        $cgcc = count($gcc);

        $cdch = Ch::where('status', 'Livré')->count();
        $cdeu = Eu::where('status', 'Livré')->count();
        $cdgcc = Gcc::where('status', 'Livré')->count();

        $coch = Ch::where('status', 'En cours')->count();
        $coeu = Eu::where('status', 'En cours')->count();
        $cogcc = Gcc::where('status', 'En cours')->count();

        $cwch = Ch::where('status', 'En attente')->count();
        $cweu = Eu::where('status', 'En attente')->count();
        $cwgcc = Gcc::where('status', 'En attente')->count();
        

        $all = $cch + $ceu + $cgcc;
        $livred = $cdch + $cdgcc + $cdeu;
        $ongoing = $coch + $coeu + $cogcc;
        $waiting = $cwch + $cweu + $cwgcc;

        return Inertia::render('Dashboard', [
            'all' => $all,
            'livred' => $livred,
            'ongoing' => $ongoing,
            'waiting' => $waiting,
            'allItems' => $allItems
        ]);
    }
}
