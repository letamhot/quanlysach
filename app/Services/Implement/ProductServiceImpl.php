<?php

namespace App\Services\Implement;

use App\Repositories\ProductRepository;
use App\Services\ProductService;
use Illuminate\Support\Str;
class ProductServiceImpl extends BaseServiceImpl implements ProductService
{
    
    public function __construct(ProductRepository $productRepository)
    {
        $this->modelRepository = $productRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function searchProduct($request)
    {
            return $this->modelRepository->searchProduct($request);
    }

    public function getProductwithCategory($slugCategory){
        return $this->modelRepository->getProductwithCategory($slugCategory);
    }
    

    public function create($request)
    {
        try
        {   
            // category
            $product = $request->except('image');
        
            if ($request->hasFile('image')) {
                $product['image'] = $this->image($request);
            }
            $product['slug'] = Str::slug($request->name);

            return $this->modelRepository->create($product);
           

        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
    }
     public function update($request, $product)
    {
            $data = $request->except('image');
        
            if ($request->hasFile('image')) {
                $data['image'] = $this->image($request);
            }
            $data['slug'] = Str::slug($request->name)."-".time();
            // dd($data);
            return $this->modelRepository->update($data, $product);
            

    }
    public function destroy($product)
    {
        try {
            $product->delete();
        } catch (\Exception $e) {
            return null;
        }
    }
    private function image($request){
        $file = $request->file('image');
        $b64 = base64_encode(file_get_contents($file->path()));
        $ext = $file->getClientMimeType();
        $img = "data:$ext;base64, $b64";
        return $img;
    }
    /**
     * Make Model Class.
     */
}