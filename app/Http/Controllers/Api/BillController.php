<?php

namespace App\Http\Controllers\Api;
use App\Bill;

use App\Http\Controllers\Controller;
use App\Services\BillService;
use Illuminate\Http\Request;
use App\Http\Resources\Bill as BillResource;
use App\User;
use Illuminate\Support\Facades\Auth;

class BillController extends Controller
{
    protected $billService;

    public function __construct(BillService $billService)
    {
        // $this->middleware( 'role:Admin' );
        $this->billService = $billService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
           
            $bill = $this->billService->searchBill($request);
            return BillResource::collection($bill);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bill $bill)
    {
        $bill = $this->billService->update($request, $bill);
        return $bill;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bill $bill)
    {
        return $this->billService->destroy($bill);
    }

   
}
