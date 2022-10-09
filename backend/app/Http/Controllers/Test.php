<?php

namespace App\Http\Controllers;

use App\Models\Test as ModelsTest;
use Illuminate\Http\Request;

class Test extends Controller
{
    function test(){
        $temp = new ModelsTest;

        $temp->name = 'hello world';
        $temp->name2 = 'hello world2';

        $temp->save();
        echo "saved";
    }
}
