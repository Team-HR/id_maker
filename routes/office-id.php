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

Route::middleware('auth')->group(function () {
    Route::post('/office-id/save', [OfficeIdController::class, 'save'])->name('office-id.save');
    Route::post('/office-id/update/{id}', [OfficeIdController::class, 'patch'])->name('office-id.patch');
    Route::get('/office-id/search', [OfficeIdController::class, 'search_office_id'])->name('office-id.search');
});
