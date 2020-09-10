<?php

namespace App\Repositories\Implement;
use App\Product;
use App\Category;
use App\Repositories\ProductRepository;
use App\Repositories\Eloquent\EloquentRepository;
// use App\Http\Resources\Category as CategoryResource;
use Illuminate\Database\Eloquent\Builder;


class ProductRepositoryImpl extends EloquentRepository implements ProductRepository
{
    /**
     * Certain model.
     *
     * @return string
     */
    public function getModel()
    {
        return Product::class;
    }

    public function searchProduct($request)
    {
        // dd(request('search'));
        try {
                $product =  $this->model::when($request->has('search'), function($query){
                    $query->where('id', 'LIKE', '%' . request('search') . '%')
                    ->orWhere('name', 'LIKE', '%' . request('search') . '%')
                    ->orWhereHas('category', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    })
                    ->orWhereHas('producer', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    });
                })
                ->paginate(5)->withQueryString();
           
        } catch (\Exception $e) {
            return null;
        }
        return $product;
    }
    public function getProductwithCategory($slugCategory){
        $category = Category::where("slug", $slugCategory)->get()->first();
        if($category){
            return $this->model::where("categories_id", $category->id);
        }else {
            return null;
        }
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

    public function update($data, $product)
    {
        try
        {
    
            $product->update($data);
        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
        return $product->fresh();
    }

    public function destroy($product)
    {
        try {
            $product->destroy();
        } catch (\Exception $e) {
            return null;
        }
    }
   
}