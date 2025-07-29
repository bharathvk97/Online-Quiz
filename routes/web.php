<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuizController;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/register',[AuthController::class, 'showRegisterForm'])->name('register.form');
Route::post('/register',[AuthController::class, 'register'])->name('register');
Route::get('/',[AuthController::class, 'showLoginForm'])->name('login.form');
Route::post('/login',[AuthController::class, 'login'])->name('login');
Route::middleware('auth')->group(function () {
   Route::get('/quiz',[DashboardController::class, 'index'])->name('quiz');
   Route::get('/quiz/categories',[DashboardController::class, 'getCategories']);
   Route::get('/quiz/fetch/{category}',[QuizController::class, 'fetchQuestions']);

});
