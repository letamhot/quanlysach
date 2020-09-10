<?php

namespace App\Repositories\Implement;
use App\Bill;
use App\Repositories\BillRepository;
use App\Repositories\Eloquent\EloquentRepository;
use Illuminate\Database\Eloquent\Builder;

// use App\Http\Resources\Bill as BillResource;


class BillRepositoryImpl extends EloquentRepository implements BillRepository
{
    /**
     * Certain model.
     *
     * @return string
     */
    public function getModel()
    {
        return Bill::class;
    }

    public function searchBill($request)
    {
        try {
                $bill =  $this->model::when($request->has('search'), function($query){
                    $query->where('id', 'LIKE', '%' . request('search') . '%')
                    ->orWhereHas('user', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    });
                })->with('products')->paginate(10)->withQueryString();
           
        } catch (\Exception $e) {
            return null;
        }
        return $bill;
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

    public function update($data, $bill)
    {
        try
        {
    
            $bill->update($data);
        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
        return $bill->fresh();
    }

    public function destroy($bill)
    {
        try {
            $bill->destroy();
        } catch (\Exception $e) {
            return null;
        }
    }
   
}