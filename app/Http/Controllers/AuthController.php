<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Enums\UserType;
use App\Enums\Status;

class AuthController extends Controller
{
    public function showLoginForm(){
        return view('user.login');
    }
    
    public function login(Request $request){
        $request->validate([
            'username'    => 'required',
            'password' => 'required',
        ]);

        if(Auth::attempt($request->only('username','password'))) {
            return redirect()->route('quiz');
        }

        return back()->withErrors(['email'=>'Invalid credentials']);
    }

    public function showRegisterForm(){
        return view('user.register');
    }

    public function register(Request $request){
        $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|same:password_confirmation',
        ]);
        User::create([
            'username'=>$request->username,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);

        return redirect()->route('login.form');
    }

}
