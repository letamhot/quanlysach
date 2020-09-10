<?php

namespace App\Repositories\Implement;
use App\Product;
use App\Repositories\ProductDetailRepository;
use App\Repositories\Eloquent\EloquentRepository;
// use App\Http\Resources\Category as CategoryResource;
use Illuminate\Database\Eloquent\Builder;


class ProductDetailRepositoryImpl extends EloquentRepository implements ProductDetailRepository
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

    public function productDetail($slug)
    {
        // dd(request('search'));
        try {
                return  $this->model::where('slug', $slug)->get()->first();      
        } catch (\Exception $e) {
            return null;
        }
    }
}