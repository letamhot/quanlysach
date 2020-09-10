<?php

namespace App\Repositories\Implement;
use App\Category;
use App\Repositories\CategoryRepository;
use App\Repositories\Eloquent\EloquentRepository;
// use App\Http\Resources\Category as CategoryResource;


class CategoryRepositoryImpl extends EloquentRepository implements CategoryRepository
{
    /**
     * Certain model.
     *
     * @return string
     */
    public function getModel()
    {
        return Category::class;
    }

    public function searchCategory($request)
    {
        try {
                $category =  $this->model::when($request->has('search'), function($query){
                    $query->where('id', 'LIKE', '%' . request('search') . '%')
                    ->orWhere('name', 'LIKE', '%' . request('search') . '%');
                })->paginate(10)->withQueryString();
           
        } catch (\Exception $e) {
            return null;
        }
        return $category;
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
    public function show($slug)
    {
        // dd(request('search'));
        try {
                return  $this->model::where('slug', $slug)->get()->first();      
        } catch (\Exception $e) {
            return null;
        }
    }

    public function update($data, $category)
    {
        try
        {
    
            $category->update($data);
        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
        return $category->fresh();
    }

    public function destroy($category)
    {
        try {
            $category->destroy();
        } catch (\Exception $e) {
            return null;
        }
    }
   
}