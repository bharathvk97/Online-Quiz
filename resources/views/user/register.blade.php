@extends('layouts.quiz_layout')
@section('title', 'Galtech Online Quiz')
@section('content')
  <div class="page-title">Online Quiz - Signup</div>

  <div class="form-container">
    <div class="card">
      <h2>Create an account</h2>
      <form action="{{ route('register') }}" method="post">
        @csrf
         <div class="input-icon-wrapper">
          <i class="fa-solid fa-user"></i>
          <input type="text" name="username" value="{{ old('username') }}" placeholder="Username">
        </div>
        @if ($errors->has('username'))
          <div style="color: red; margin-top: 5px;">
            {{ $errors->first('username') }}
          </div>
        @endif
        <div class="input-icon-wrapper">
        <i class="fa-solid fa-envelope"></i>
        <input type="email" name="email" value="{{ old('email') }}" placeholder="Email">
        </div>
         @if ($errors->has('email'))
          <div style="color: red; margin-top: 5px;">
            {{ $errors->first('email') }}
          </div>
        @endif
        <div class="input-icon-wrapper">
        <i class="fa-solid fa-lock"></i>
        <input type="password" name="password" placeholder="New Password">
        </div>
         @if ($errors->has('password'))
          <div style="color: red; margin-top: 5px;">
            {{ $errors->first('password') }}
          </div>
        @endif
        <div class="input-icon-wrapper">
        <i class="fa-solid fa-lock"></i>
        <input type="password" name="password_confirmation" placeholder="New Password (Repeat)">
        </div>
        <button type="submit" class="submit-btn">CREATE AN ACCOUNT</button>
        <a href="{{ route('login.form') }}" class="cancel-link">Cancel</a>
      </form>
    </div>
  </div>
@endsection
