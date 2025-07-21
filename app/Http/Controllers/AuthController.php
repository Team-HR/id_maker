<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function login (Request $request){
        $credentials = $request->validate([
            'username' => ['required' , 'string'],
            'password' => ['required' , 'string'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return to_route('dashboard');
        }

        return back()->withErrors([
            'username' => 'The provided credentials do not match our records.',
        ]);
    }

   public function username_update(Request $request)
    {
        $user_id = Auth::user()->id;

        $validated = $request->validate([
            'new_username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users', 'username')->ignore($user_id),
            ],
        ]);

        $user = User::findOrFail($user_id);

        if ($user->username === $validated['new_username']) {
            return back()->withErrors(['new_username' => 'New username must be different from the current one.']);
        }

        $user->username = $validated['new_username'];
        $user->save();

        return back()->with('success', 'Username updated successfully.');
    }

}
