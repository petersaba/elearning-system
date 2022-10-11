<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActionsController extends Controller
{
    function assignInstructorToCourse(Request $request){
        $instructor = User::where('email', $request->instructor_email)->get()->first();
        if(!$instructor || $instructor->type != 'instructor'){
            return response()->json([
                'status' => 'Error',
                'message' => 'Instructor does not exist'
            ], 404);
        }

        $course = Course::where('code', $request->course_code)->get()->first();
        if(!$course){
            return response()->json([
                'status' => 'Error',
                'message' => 'Course does not exist'
            ], 404);
        }

        if($course->instructor_id){
            return response()->json([
                'status' => 'Error',
                'message' => 'Course already has instructor assigned'
            ], 415);
        }

        $course->instructor_id = $instructor->id;
        $instructor->push('courses', $course->id);

        if($instructor->save() && $course->save()){
            return response()->json([
                'status' => 'Success',
            ], 201);
        }
    }

    function enrollInCourse(Request $request){
        $validator = validator($request->all(), ['course_id' => 'string|required']);
        
        if($validator->fails()){
            return response()->json([
                'status' => 'Error',
                'message' => 'Data is invalid'
            ], 415);
        }

        $user = User::find(Auth::id());
        $user->push('enrolled_in', $request->course_id);

        if($user->save()){
            return response()->json([
                'status' => 'Success',
                'message' => 'Successfully enrolled in course'
            ], 201);
        }
    }
}
