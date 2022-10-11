<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;


class AuthController extends Controller
{

    public function addUser(Request $request, $type){
        $validator = validator($request->all(), [
            'full_name' => 'string|required',
            'email' => 'email|required',
            'password' => 'string|required',
            'confirm_password' => 'string|required'
        ]);
        
        if($validator->fails() || !in_array($type, ['admin', 'instructor', 'student'])
                || $request->password != $request->confirm_password){
            return response()->json([
                'status' => 'Error',
                'message' => 'Data is invalid'
            ], 415);
        }

        if(self::isAttributeAlreadyUsed($request->email, 'email')){
            return response()->json([
                'status' => 'Error',
                'message' => 'User already exists'
            ], 403);
        }

        $user = new User();
        $user->full_name = $request->full_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->type = $type;
        if($type != 'admin'){
            $user->courses = [];
        }

        if($user->save()){
            return response()->json([
                'status' => 'Success',
                'message' => $user
            ], 201);
        }
    }

    function isAttributeAlreadyUsed($value, $attribute){
        if($attribute == 'id'){
            $user = User::find($value)->first();
        }else{
            $user = User::where($attribute, $value)->first();
        }

        return $user ? TRUE : FALSE;
    }

    /**
     * Get a JWT via given credentials.
     * 
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = validator($request->all(), [
            'email' => 'email|required',
            'password' => 'string|required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'Error',
                'message' => 'Data is invalid'
            ], 415);
        }

        $credentials = request(['email', 'password']);

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = Auth::user();
        $user->token = $this->respondWithToken($token);

        return response()->json([
            'status' => 'Success',
            'message' => $user
        ], 200);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl')
        ]);
    }

}