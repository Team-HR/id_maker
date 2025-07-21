<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {    
    Route::patch('/username-update',[AuthController::class,'username_update'])->name('username.update');
    Route::patch('/password-update',[AuthController::class,'password_update'])->name('password.update');
});
