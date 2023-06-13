<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use App\Models\Product;
use App\Models\MetaData;
use Illuminate\Support\Facades\DB;
use App\Models\Continent;

class PublishingController extends Controller
{
    public function create(Request $request)
    {
        $region = $request->query('region');
        
        $procedure = $request->query('procedure');
        $country = $request->query('country');
        $product = $request->query('product');
        if($region == "EU") {
            if($procedure == 'Nationale' || $procedure == 'Centralized') {
                $md = MetaData::where([
                    ['Product', '=', $product], 
                    ['procedure', '=', $procedure], 
                    ['country', '=',$country['value']]
                ])->first();
                if($md) {
                    return Inertia::render('publishing/create', [
                                'metadata' => $md,
                                'countries' => $country['value'],
                                'products' => $product
                            ]);
                }
            }else {
                $listmd = [];
                for($i = 0; $i < count($country); $i+=2) {
                    // dd($country[$i]['label']);
                    $md = MetaData::where([
                        ['Product', '=', $product], 
                        ['procedure', '=', $procedure], 
                        ['country', '=',$country[$i]['label']]
                    ])->first();
                    array_push($listmd, $md);
                }
                return Inertia::render('publishing/createmrp', [
                    'metadata' => $listmd,
                ]);
            }
        }else if ($region == "CH") {
            
            $md = MetaData::where([
                ['Product', '=', $product], 
                ['procedure', '=', $procedure], 
                ['country', '=', $country['value']]
            ])->first();
            
            if($md) {
                return Inertia::render('publishing/createch', [
                            'metadata' => $md,
                            'countries' => $country['value'],
                            'products' => $product
                        ]);
            }
        }else if ($region == "GCC") {
            $md = MetaData::where([
                ['Product', '=', $product], 
                ['procedure', '=', $procedure], 
                ['country', '=', $country['value']]
            ])->first();
            
            if($md) {
                return Inertia::render('publishing/creategcc', [
                            'metadata' => $md,
                            'countries' => $country['value'],
                            'products' => $product
                        ]);
            }
        }
        
        // $region = $request->query('region');
        // $products = Product::all();
        // if($region == "Eu") {
        //     $cc = Continent::where('continent', 'europe')->first('countries');
        //     $countries = json_decode($cc->countries);
        //     return Inertia::render('publishing/create', [
        //         'countries' => $countries,
        //         'products' => $products
        //     ]);
        // }else if ($region == "Asia") {
        //     $cc = Continent::where('continent', 'asia')->first('countries');
        // }else if ($region == "GCC") {
        //     $cc = Continent::where('continent', 'gcc')->first('countries');
        //     $countries = json_decode($cc->countries);
        //     return Inertia::render('publishing/creategcc', [
        //         'countries' => $countries,
        //         'products' => $products
        //     ]);
        // }else if ($region == "CH"){
        //     return Inertia::render('publishing/createch');
        // }
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
