<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use App\Models\Product;
use App\Models\MetaData;
use Illuminate\Support\Facades\DB;
class PublishingController extends Controller
{
    public function create()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('forms/publishing', [
            'countries' => $countries,
            'products' => $products
        ]);
    }

    public function getmetadata(Request $request) {
        $pro = $request->produit;
        $country = $request->country;
        $procedure = $request->procedure;
        $md = MetaData::where([
            ['Product', '=', $pro], 
            ['procedure', '=', $procedure], 
            ['country', '=',$country]
        ])->first();
        return response($md, 200);
    }
}
