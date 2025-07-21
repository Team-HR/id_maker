<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfficeIdController;
use App\Http\Controllers\ProfileController;
use App\Models\OfficeId;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::post('/login', [AuthController::class,'login'])->name('login.post');

Route::middleware('auth')->group(function () {    
    Route::get('/logout', function (Request $request) {
        Auth::logout(); // Logs the user out

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('login');
    })->name('logout');
});
