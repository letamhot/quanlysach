<?php

namespace App\Repositories\Implement;
use App\BillDetail;
use App\Repositories\BillDetailRepository;
use App\Repositories\Eloquent\EloquentRepository;
use Illuminate\Database\Eloquent\Builder;

// use App\Http\Resources\BillDetail as BillDetailResource;


class BillDetailRepositoryImpl extends EloquentRepository implements BillDetailRepository
{
    /**
     * Certain model.
     *
     * @return string
     */
    public function getModel()
    {
        return BillDetail::class;
    }

    public function searchBillDetail($request)
    {
        try {
                $billDetail =  $this->model::when($request->has('search'), function($query){
                    $query->where('id', 'LIKE', '%' . request('search') . '%')
                    ->orWhereHas('user', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    })
                    ->orWhereHas('bill', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    });
                })->paginate(10)->withQueryString();
           
        } catch (\Exception $e) {
            return null;
        }
        return $billDetail;
    }
    

    public function create($data)
    {
        try
        {   
            return $this->model->create($data);

        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }

    }
    // public function show($slug)
    // {
    //     // dd(request('search'));
    //     try {
    //             return  $this->model::where('slug', $slug)->get()->first();      
    //     } catch (\Exception $e) {
    //         return null;
    //     }
    // }

    public function update($data, $billDetail)
    {
        try
        {
    
            $billDetail->update($data);
        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
        return $billDetail->fresh();
    }

    public function destroy($billDetail)
    {
        try {
            $billDetail->destroy();
        } catch (\Exception $e) {
            return null;
        }
    }
   
}