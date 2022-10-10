<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class ActionsController extends Controller
{
    function assignInstructorToCourse($instructor_id, $course_id){
        $instructor = User::find($instructor_id);
        if(!$instructor){
            return response()->json([
                'status' => 'Error',
                'message' => 'Instructor does not exist'
            ], 404);
        }

        $course = Course::find($course_id);
        if(!$course){
            return response()->json([
                'status' => 'Error',
                'message' => 'Course does not exist'
            ], 404);
        }
    }
}
