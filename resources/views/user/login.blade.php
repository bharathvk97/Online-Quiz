@extends('layouts.quiz_layout')
@section('title', 'Galtech Online Quiz')
@section('content')
    <div class="wrapper">
        <div class="login-title">Online Quiz - Login</div>
        <div class="container">
            <h2>Login</h2>
            <form action="{{ route('login') }}" method="POST">
                @csrf
                <input type="text" name="username" placeholder="Username" value="{{old('username')}}">
                @if ($errors->has('username'))
                    <div style="color: red; margin-top: 5px;">
                        {{ $errors->first('username') }}
                    </div>
                @endif
                <input type="password" name="password" placeholder="Password">
                @if ($errors->has('password'))
                    <div style="color: red; margin-top: 5px;">
                        {{ $errors->first('password') }}
                    </div>
                @endif
                <div class="forgot">
                    <a href="/" style="float:left;">Forgot Password?</a><br/>
                </div>
                <button class="btn" type="submit">Login</button>
            </form>
            <div class="signup">
                <span style="color:#a9a9a9;">Not a member?</span> <a href="{{ route('register.form') }}">Signup</a>
            </div>
        </div>
    </div>
@endsection


