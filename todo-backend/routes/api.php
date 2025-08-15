<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

// Default bawaan Laravel untuk user auth (bisa biarkan atau hapus kalau tidak dipakai)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// CRUD Todo
Route::get('/todos', [TodoController::class, 'index']);      // GET todo
Route::post('/todos', [TodoController::class, 'store']);     // POST todo
Route::patch('/todos/{id}', [TodoController::class, 'update']); // PATCH update status/title todo
Route::delete('/todos/{id}', [TodoController::class, 'destroy']); // DELETE todo
