<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CreateController extends Controller
{
    function addCourse(Request $request){
        $validator = validator($request->all(), [
            'code' => 'string|required',
            'name' => 'string|required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'Error',
                'message' => 'Data is invalid'
            ], 415);
        }
    }
}
