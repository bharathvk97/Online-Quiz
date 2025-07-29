<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function index()
    {
        return view('quiz.quiz');
    }

    public function getCategories()
    {
        $response = Http::get(env('QUIZ_CATEGORIES'));
        if ($response->successful()) {
            return response()->json($response->json());
        }
        return response()->json(['error' => 'Something went wrong'], 500);
    }
}
