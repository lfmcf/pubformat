<?php

use App\Http\Controllers\EuController;
use App\Http\Controllers\ChController;
use App\Http\Controllers\FormattingController;
use App\Http\Controllers\GccController;
use App\Http\Controllers\NewRequestController;
use App\Http\Controllers\PublishingController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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

// Route::get('/', function () {

//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

/**
 * Teamwork routes
 */
Route::group(['prefix' => 'teams', 'namespace' => 'Teamwork'], function () {
    Route::get('/teams', [App\Http\Controllers\Teamwork\TeamController::class, 'index'])->name('teams.index');
    Route::get('teams/create', [App\Http\Controllers\Teamwork\TeamController::class, 'create'])->name('teams.create');
    Route::post('teams', [App\Http\Controllers\Teamwork\TeamController::class, 'store'])->name('teams.store');
    Route::get('edit/{id}', [App\Http\Controllers\Teamwork\TeamController::class, 'edit'])->name('teams.edit');
    Route::put('edit/{id}', [App\Http\Controllers\Teamwork\TeamController::class, 'update'])->name('teams.update');
    Route::delete('destroy/{id}', [App\Http\Controllers\Teamwork\TeamController::class, 'destroy'])->name('teams.destroy');
    Route::get('switch/{id}', [App\Http\Controllers\Teamwork\TeamController::class, 'switchTeam'])->name('teams.switch');

    Route::get('members/{id}', [App\Http\Controllers\Teamwork\TeamMemberController::class, 'show'])->name('teams.members.show');
    Route::get('members/resend/{invite_id}', [App\Http\Controllers\Teamwork\TeamMemberController::class, 'resendInvite'])->name('teams.members.resend_invite');
    Route::post('members/{id}', [App\Http\Controllers\Teamwork\TeamMemberController::class, 'invite'])->name('teams.members.invite');
    Route::delete('members/{id}/{user_id}', [App\Http\Controllers\Teamwork\TeamMemberController::class, 'destroy'])->name('teams.members.destroy');

    Route::get('accept/{token}', [App\Http\Controllers\Teamwork\AuthController::class, 'acceptInvite'])->name('teams.accept_invite');
});



Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', [ReportController::class, 'dashboard']);
    Route::get('dashboard', [ReportController::class, 'dashboard'])->name('dashboard');

    Route::get('/formatting', [FormattingController::class, 'create'])->name('ch-create');
    Route::post('formattingStore', [FormattingController::class, 'store'])->name('formattingStore');
    Route::get('/formatting/{id}/edit', [FormattingController::class, 'edit'])->name('formattingEdit');
    Route::post('updateformatting', [FormattingController::class, 'update'])->name('updateformatting');
    Route::post('comfirmdeadline', [FormattingController::class, 'comfirm'])->name('comfirmdeadline');

    Route::get('/publishing', [PublishingController::class, 'create'])->name('pub-create');
    Route::post('/publishingStore', [PublishingController::class, 'store'])->name('publishingStore');
    Route::post('publishingStorech', [PublishingController::class, 'storeCh'])->name('publishingStorech');
    Route::post('publishingStoremrp', [PublishingController::class, 'storeMrp'])->name('publishingStoremrp');
    Route::post('/getmd', [PublishingController::class, 'getmetadata'])->name('gmd');
    Route::post('addch', [ChController::class, 'store'])->name('addch');
    Route::get('/ch/{id}/edit', [ChController::class, 'edit'])->name('/ch/edit');
    Route::post('updatech', [ChController::class, 'update'])->name('updatech');

    Route::get('/eu', [EuController::class, 'create'])->name('eu-create');
    Route::post('addeu', [EuController::class, 'store'])->name('addeu');
    Route::get('/eu/{id}/edit', [EuController::class, 'edit'])->name('/eu/edit');
    Route::post('updateeu', [EuController::class, 'update'])->name('updateeu');

    Route::get('/gcc', [GccController::class, 'create'])->name('gcc-create');
    Route::post('addgcc', [GccController::class, 'store'])->name('addgcc');
    Route::get('/gcc/{id}/edit', [GccController::class, 'edit'])->name('/gcc/edit');
    Route::post('updategcc', [GccController::class, 'update'])->name('updategcc');

    Route::get('/ch/index', [ChController::class, 'index'])->name('ch-index');
    Route::get('/eu/index', [EuController::class, 'index'])->name('eu-index');
    Route::get('/gcc/index', [GccController::class, 'index'])->name('gcc-index');
    Route::get('/list', [ReportController::class, 'list'])->name('list');
    Route::get('/tasks', [ReportController::class, 'task'])->name('tasks');

    Route::post('/shownotification', [ReportController::class, 'show'])->name('shownotification');

    Route::post('/getProductOrCountry', [ReportController::class, 'getProductOrCountry']);

    Route::get('/editpublishing', [PublishingController::class, 'edit']);


    // Route::get('/attach', function() {
    //     return(Auth::user()->teams()->attach(1));
    // });

});

require __DIR__ . '/auth.php';
