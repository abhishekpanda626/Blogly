<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $req)
    {
        $validator= Validator::make($req->all(),[
            'name' => 'required|min:4',
            'contact_no' => 'required|numeric',
            'email' => 'required|email|unique:users',
            'password' =>'required|min:8',
            'file_path'=>'required',
            'gender'=>'required|alpha'
        ]);
        if($validator->fails())
        {
            return response()->json(['validate_err'=>$validator->messages()]);
        }
        
        $user=new User;
        $user->name=$req->input('name');
        $user->contact_no=$req->input('contact_no');    
        $user->gender=$req->input('gender');        
        $user->email=$req->input('email');
        $user->password=Hash::make($req->input('password'));
        $user->file_path=$req->file('file_path')->store('user');
        $user->save();   
        $resArr=[];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        $resArr['token'] = $user->createToken('Passport-Auth')->accessToken;
        $resArr['Name']=$user->name;
        return response()->json($resArr, 200);
        
    }
    public function login(Request $request)
    {
        $user=new User;
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];
  
        if (auth()->attempt($data)) {
        $resArr=[];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        $resArr['token'] = $user->createToken('Passport-Auth')->accessToken;
        $resArr['Name']=$user->name;
        return response()->json($resArr, 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
    public function userInfo() 
    {
 
     $user = auth()->user();
     return response()->json(['user' => $user], 200);
 
    }
 
}
