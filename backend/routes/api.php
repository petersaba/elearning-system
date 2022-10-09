<?php

use App\Http\Controllers\AuthController;

use Illuminate\Support\Facades\Route;


Route::post('user/{id?}', [AuthController::class, 'addOrEditUser']);
Route::post('login', [AuthController::class, 'login'])->name('login');


//     Route::post('logout', [AuthController::class, 'logout']);
//     Route::post('refresh', [AuthController::class, 'refresh']);
//     Route::post('me', [AuthController::class, 'me']);