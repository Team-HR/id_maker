<?php

use App\Models\OfficeId;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        $office_ids = OfficeId::where('status','active')
            ->where('user_id', Auth::user()->id)
            ->get();

        return Inertia::render('Dashboard', [ 'office_ids' => $office_ids]);
    })->name('dashboard');

    Route::get('/settings', function () {
        return Inertia::render('Settings');
    })->name('settings');

});

require __DIR__.'/auth.php';
require __DIR__.'/office-id.php';
require __DIR__.'/account-settings.php';
