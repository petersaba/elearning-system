<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Console\Migrations\StatusCommand;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

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

    function getUserById($id){
        $validator = validator(['id' => $id], ['id' => 'string|required']);
        if($validator->fails()){
            return response()->json([
                'status' => 'Error',
                'message' => 'Data is invalid'
            ], 415);
        } 

        $user = User::find($id);
        if($user){
            return response()->json([
                'status' => 'Success',
                'message' => $user
            ], 200);
        }

        return  response()->json([
            'status' => 'Error',
            'message' => 'User does not exist'
        ], 404);
    }

    function getUnassignedCourses(){
        $courses = Course::whereNull('instructor_id')->get();

        return response()->json([
            'status' => 'Success',
            'message' => $courses
        ], 200);
    }
}
