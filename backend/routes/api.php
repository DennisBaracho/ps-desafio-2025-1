<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
});

<<<<<<< Updated upstream
=======
Route::get('/filter/{id}', [VehicleController::class, 'filter']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::post('/buy/{id}', [VehicleController::class, 'buy']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/vehicles/{id}', [VehicleController::class, 'show']);

>>>>>>> Stashed changes
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
