<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

    public function password_update(Request $request)
    {
        $validated = $request->validate([
            'current_password' => [
                'required',
                'string',
                'max:255',
            ],
            'new_password' => [
                'required',
                'string',
                'max:255',
            ],
        ]);

        $user = Auth::user();

        // Check if the current password is correct
        if (!Hash::check($validated['current_password'], $user->password)) {
            return back()->withErrors(['current_password' => 'Current password is incorrect.']);
        }

        // Check if the new password is different
        if (Hash::check($validated['new_password'], $user->password)) {
            return back()->withErrors(['new_password' => 'New password must be different from the current one.']);
        }

        User::where('id', $user->id)->update([
            'password' => Hash::make($validated['new_password'])
        ]);

        return back()->with('success', 'Password updated successfully.');
    }

}
