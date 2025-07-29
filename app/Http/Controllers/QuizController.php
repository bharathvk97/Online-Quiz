<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class QuizController extends Controller
{

    public function fetchQuestions($category)
    {
        $categories_in_formatted = strtolower(str_replace([' & ', ' ', '-'], ['_', '_', '_'], $category));
        $response = Http::get(env('QUIZ_QUESTIONS'), [
            'categories' => $categories_in_formatted,
            'limit' => 15,
        ]);
        return response()->json([
            $category => $response->json()
        ]);
    }

}