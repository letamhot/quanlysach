<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProducerCreateRequest;
use App\Http\Requests\ProducerUpdateRequest;
use App\Producer;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Services\ProducerService;
use App\Http\Resources\Producer as ProducerResource;


class ProducerController extends Controller
{
    protected $producerService;

    public function  __construct(ProducerService $producerService){
        $this->producerService = $producerService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
           
            $producer= $this->producerService->searchProducer($request);
            return ProducerResource::collection($producer);
        } catch (\Exception $e) {
            return $this->errorExceptionMessage();
        }
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProducerCreateRequest $request)
    {
        if(Auth::user()->role_id == '1'){
        $producers = $this->producerService->create($request);
        return new ProducerResource($producers);
        }
        else {
            return abort(401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function show(Producer $producer)
    {
        return new ProducerResource($producer);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function update(ProducerUpdateRequest $request, Producer $producer)
    {
        if(Auth::user()->role_id == '1'){
        $producer = $this->producerService->update($request, $producer);
        return new ProducerResource($producer);
        }
        else {
            return abort(401);
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producer  $producer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producer $producer)
    {
        if(Auth::user()->role_id == '1'){
        $this->producerService->destroy($producer);
        }
        else {
            return abort(401);
        }
    }
}
