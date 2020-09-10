<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ShoppingMail;
use Mail;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function myDemoMail()
    {
        $myEmail = 'aatmaninfotech@gmail.com';
   
        $details = [
            'title' => 'Mail Demo from ItSolutionStuff.com',
            'url' => 'https://www.itsolutionstuff.com'
        ];
  
        Mail::to($myEmail)->send(new ShoppingMail($details));
   
        dd("Mail Send Successfully");
    }
}
