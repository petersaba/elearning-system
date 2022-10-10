<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class GetDataController extends Controller
{
    function getUsersByType($type){
        if($type != 'student' && $type != 'instructor'){
            return response()->json([
                'status' => 'Error',
                'message' => 'Data is invalid'
            ], 415);
        }

        $users = User::where('type', $type)->get();
        return response()->json([
            'status' => 'Success',
            'message' => $users
        ], 200);
    }
}
