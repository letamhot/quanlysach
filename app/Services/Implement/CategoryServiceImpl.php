<?php

namespace App\Services\Implement;

use App\Repositories\CategoryRepository;
use App\Services\CategoryService;
use Illuminate\Support\Str;

class CategoryServiceImpl extends BaseServiceImpl implements CategoryService
{
    
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->modelRepository = $categoryRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function searchCategory($request)
    {
            return $this->modelRepository->searchCategory($request);
           
            
       
    }
    public function create($request)
    {
        try
        {   
            
            $category = $request->except('image');
        
            if ($request->hasFile('image')) {
                $category['image'] = $this->image($request);
            }
            $category['slug'] = Str::slug($request->name);
            return $this->modelRepository->create($category);
           

        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
    }

    public function show($slug){
        return $this->modelRepository->show($slug);
    }

     public function update($request, $category)
    {
            $data = $request->except('image');
        
            if ($request->hasFile('image')) {
                $data['image'] = $this->image($request);
            }
            $category['slug'] = Str::slug($request->name);
            return $this->modelRepository->update($data, $category);

    }
    public function destroy($category)
    {
        try {
            $category->delete();
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
}