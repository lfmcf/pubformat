<?php

use App\Http\Controllers\EuController;
use App\Http\Controllers\ChController;
use App\Http\Controllers\GccController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/ch', [ChController::class, 'create'])->name('ch-create');
Route::post('addch', [ChController::class, 'store'])->name('addch');
Route::get('/eu', [EuController::class, 'create'])->name('eu-create');
Route::post('addeu', [EuController::class, 'store'])->name('addeu');
Route::get('/gcc', [GccController::class, 'create'])->name('gcc-create');
Route::post('addgcc', [GccController::class, 'store'])->name('addgcc');
Route::get('/ch/index', [ChController::class, 'index'])->name('ch-index');
Route::get('/eu/index', [EuController::class, 'index'])->name('eu-index');
Route::get('/gcc/index', [GccController::class, 'index'])->name('gcc-index');
Route::get('/dossiers', [ReportController::class, 'list'])->name('dossiers');

require __DIR__.'/auth.php';
