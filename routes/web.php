<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfficeIdController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::post('/login', [AuthController::class,'login'])->name('login.post');

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::post('/office-id/save', [OfficeIdController::class, 'save'])->name('office-id.save');
    Route::post('/office-id/update/{id}', [OfficeIdController::class, 'patch'])->name('office-id.patch');
    Route::get('/office-id/search', [OfficeIdController::class, 'search_office_id'])->name('office-id.search');
});

// require __DIR__.'/auth.php';
