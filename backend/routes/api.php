<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CreateController;
use App\Http\Controllers\GetDataController;
use App\Http\Controllers\ActionsController;
use Illuminate\Support\Facades\Route;

Route::post('register/{type?}', [AuthController::class, 'addUser']);
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::group(['middleware' => 'auth:api'], function(){
    Route::group(['middleware' => 'authorized:instructor'], function(){
        Route::post('courses', [CreateController::class, 'addCourse']);
        Route::post('assignments', [CreateController::class, 'createAssignment']);
        Route::post('announcements', [CreateController::class, 'createAnnouncement']);
    });
    Route::group(['middleware' => 'authorized:admin'], function(){
        Route::get('type/{type}', [GetDataController::class, 'getUsersByType']);
        Route::get('users/{id}', [GetDataController::class, 'getUserById']);
        Route::post('assign_instructor', [ActionsController::class, 'assignInstructorToCourse']);
        Route::get('unassigned_courses', [GetDataController::class, 'getUnassignedCourses']);
    });
    Route::group(['middleware' => 'authorized:student'], function(){
        Route::post('enroll_in_course', [ActionsController::class, 'enrollInCourse']);
        Route::get('courses_not_enrolled_in', [GetDataController::class, 'getCoursesNotEnrolledIn']);
        Route::get('courses_enrolled_in', [GetDataController::class, 'getCoursesEnrolledIn']);
    });
});