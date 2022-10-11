<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Support\Facades\Auth;

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

        $assignment = new Assignment();
        $assignment->instructor_id = Auth::id();
        $assignment->title = $request->title;
        $assignment->content = $request->content;

        if($assignment->save()){
            return response()->json([
                'status' => 'Success',
                'message' => $assignment
            ], 201);
        }
    }

    function createAnnouncement(Request $request){
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

        $announcement = new Announcement();
        $announcement->instructor_id = Auth::id();
        $announcement->title = $request->title;
        $announcement->content = $request->content;

        if($announcement->save()){
            return response()->json([
                'status' => 'Success',
                'message' => $announcement
            ], 201);
        }
    }
}
