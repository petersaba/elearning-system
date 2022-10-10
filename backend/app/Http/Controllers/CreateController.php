<?php

namespace App\Http\Controllers;

use App\Models\Course;
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

        if($this->isAttributeAlreadyUsed($request->code, 'code')){
            return response()->json([
                'status' => 'Error',
                'message' => 'Course already exists'
            ], 403);
        }

        $course = new Course();
        $course->code = $request->code;
        $course->name = $request->name;

        if($course->save()){
            return response()->json([
                'status' => 'Success',
                'message' => $course
            ], 201);
        }
    }

    function isAttributeAlreadyUsed($value, $attribute){
        $course = Course::where($attribute, $value)->first();

        return $course ? TRUE : FALSE;
    }

    function createAssignment(Request $request){
        $validator = validator($request->all(), [
            'title' => 'string|required',
            'content' => 'string|required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'Error',
                'message' => 'Data is invalid'
            ], 415);
        }
    }
}
