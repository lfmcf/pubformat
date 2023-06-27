<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Formatting;
use App\Models\Eu;
use App\Models\Gcc;
use App\Models\Ch;
use App\Models\MetaData;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Writer\Ods\Meta;

class ReportController extends Controller
{
    public function list()
    {
        $user = auth()->user();

        if ($user->current_team_id == 1) {
            $formattings = Formatting::where('status', 'initiated')->orWhere('status', 'submitted')->get();
            // $formattings = Formatting::raw(function ($collection) {
            //     return $collection->aggregate(
            //         [
            //             ['$match' => ['status' => 'initiated']],
            //         ]
            //     );
            // });
            return Inertia::render('Dossiers/List', [
                'list' => $formattings
            ]);
        } else if ($user->current_team_id == 2) {
            $formattings = Formatting::where('status', 'submitted')->orWhere('status', 'pending')->get();
            return Inertia::render('Dossiers/List', [
                'list' => $formattings
            ]);
        } else {
            return Inertia::render('Dossiers/List', [
                'list' => ''
            ]);
        }
        // else if($user->current_team_id == 2) {

        // }

        // $eu = Eu::all();
        // $gcc = Gcc::all();

        //$allItems = collect($ch)->merge($eu)->merge($gcc)->sortByDesc('created_at');
        //$allItems = $allItems->values();


    }

    public function task()
    {
        $user = auth()->user();


        if ($user->current_team_id == 2) {
            $formattings = Formatting::where('status', 'initiated')->orWhere('status', 'pending')->get();
            return Inertia::render('Dossiers/Tasks', [
                'list' => $formattings
            ]);
        } else if ($user->current_team_id == 3) {
            $formattings = Formatting::where('status', 'submitted')->orWhere('status', 'pending')->get();
            return Inertia::render('Dossiers/Tasks', [
                'list' => $formattings
            ]);
        } else {
            return Inertia::render('Dossiers/Tasks', [
                'list' => ''
            ]);
        }
    }

    public function dashboard()
    {

        $ch = Ch::all();
        $eu = Eu::all();
        $gcc = Gcc::all();
        $allItems = collect($ch)->merge($gcc)->merge($eu);

        $cch = count($ch);
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

    public function getProductOrCountry(Request $request)
    {

        if ($request->product) {

            $country = MetaData::where('product', $request->product)->where('procedure', $request->procedure)
                ->get('country');
            return $country;
        } else {

            $product = MetaData::where('country', $request->country)->where('procedure', $request->procedure)
                ->get('Product');
            return $product;
        }
    }
}
