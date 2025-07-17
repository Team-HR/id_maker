<?php

namespace App\Http\Controllers;

use App\Models\OfficeId;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class OfficeIdController extends Controller
{
    public function save (Request $request) {
        $picture = $request->file('picture');
        $path = $picture->store('IdPictures', 'public');

        $officeId = OfficeId::create([
            'user_id' => Auth::user()->id,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'position' => $request->position,
            'department' => $request->department,
            'picture' => $path,
            'configs' => json_decode($request->configs),
        ]);

        return response()->json(['message' => 'Created Successfully', 'officeId' => $officeId]);
    }

    public function patch(Request $request, $id)
    {
        // Find existing record using the route parameter
        $officeId = OfficeId::findOrFail((int) $id);

        // Handle new picture upload
        if ($request->hasFile('picture')) {
            if ($officeId->picture && Storage::disk('public')->exists($officeId->picture)) {
                Storage::disk('public')->delete($officeId->picture);
            }

            $path = $request->file('picture')->store('IdPictures', 'public');
            $officeId->picture = $path;
        }

        // Assign values from FormData
        $officeId->firstname = $request->input('firstname');
        $officeId->lastname = $request->input('lastname');
        $officeId->position = $request->input('position');
        $officeId->department = $request->input('department');
        $officeId->configs = $request->input('configs');

        $officeId->save();

        return response()->json(['message' => 'Updated Successfully']);
    }


    public function search_office_id(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required|string',
        ]);

        $search = $validated['query'];

        $results = OfficeId::where('firstname', 'like', "%{$search}%")
            ->orWhere('lastname', 'like', "%{$search}%")
            ->get();

        return response()->json($results);
    }

    
}
