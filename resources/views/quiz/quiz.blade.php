@extends('layouts.quiz_layout')
@section('title', 'Galtech Online Quiz')
@section('content')
  <div class="online_quiz_header">Online Quiz - Select Quiz Category</div>
  <div class="quiz_container" id="category-wrapper">
    <div id="category-slides"></div>
  </div>
  <div id="question-slides"></div>
  <div id="results-wrapper" style="display:none;max-width: 750px;margin: 30px auto;padding: 20px;">
    <h1 style="text-align:center;">Results</h1>
    <div id="results-content"></div>
    <div style="text-align:center; margin-top: 20px;">
      <button id="restartBtn" class="resetBtn">Reset</button>
    </div>
  </div>
@endsection
@push('scripts')
    <script src="{{ asset('js/quiz.js') }}"></script>
@endpush