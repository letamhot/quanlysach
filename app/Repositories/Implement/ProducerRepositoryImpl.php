<?php

namespace App\Repositories\Implement;
use App\Producer;
use App\Repositories\ProducerRepository;
use App\Repositories\Eloquent\EloquentRepository;
// use App\Http\Resources\Category as CategoryResource;


class ProducerRepositoryImpl extends EloquentRepository implements ProducerRepository
{
    /**
     * Certain model.
     *
     * @return string
     */
    public function getModel()
    {
        return Producer::class;
    }

    public function searchProducer($request)
    {
        try {
                $producer =  $this->model::when($request->has('search'), function($query){
                    $query->where('id', 'LIKE', '%' . request('search') . '%')
                    ->orWhere('name', 'LIKE', '%' . request('search') . '%')
                    ->orWhere('address', 'LIKE', '%' . request('search') . '%');
                })->paginate(10)->withQueryString();
           
        } catch (\Exception $e) {
            return null;
        }
        return $producer;
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

    public function update($data, $producer)
    {
        try
        {
    
            $producer->update($data);
        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
        return $producer->fresh();
    }

    public function destroy($producer)
    {
        try {
            $producer->destroy();
        } catch (\Exception $e) {
            return null;
        }
    }
   
}