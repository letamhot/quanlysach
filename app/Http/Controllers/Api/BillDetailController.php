<?php

namespace App\Http\Controllers\Api;

use App\BillDetail;
use App\Http\Controllers\Controller;
use App\Services\BillDetailService;
use Illuminate\Http\Request;
use App\Http\Resources\BillDetail as BillDetailResource;

class BillDetailController extends Controller
{
    protected $billDetailService;

    public function __construct(BillDetailService $billDetailService)
    {
        // $this->middleware( 'role:Admin' );
        $this->billDetailService = $billDetailService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
           
            $billDetail = $this->billService->searchBill($request);
            return BillDetailResource::collection($billDetail);
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
    public function update(Request $request, BillDetail $billDetail)
    {
        $billDetail = $this->billDetailService->update($request, $billDetail);
        return new BillDetailResource($billDetail);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(BillDetail $billDetail)
    {
        return $this->billDetailService->destroy($billDetail);
    }
}
