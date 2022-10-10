<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class ActionsController extends Controller
{
    function assignInstructorToCourse(Request $request){
        $instructor = User::find($request->instructor_id);
        if(!$instructor || $instructor->type != 'instructor'){
            return response()->json([
                'status' => 'Error',
                'message' => 'Instructor does not exist'
            ], 404);
        }

        $course = Course::find($request->course_id);
        if(!$course){
            return response()->json([
                'status' => 'Error',
                'message' => 'Course does not exist'
            ], 404);
        }


        $course->instructor_id = $request->instructor_id;
        $instructor->push('courses', $request->course_id);

        if($instructor->save() && $course->save()){
            return response()->json([
                'status' => 'Success',
            ], 201);
        }
    }
}
