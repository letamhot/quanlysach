<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;
use Illuminate\Support\Facades\Auth;
use App\Services\CategoryService;
use App\Http\Resources\Category as CategoryResource;


class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        // $this->middleware( 'role:Admin' );
        $this->categoryService = $categoryService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // dd($auth()->user()->role_id);
            try {
           
                $category = $this->categoryService->searchCategory($request);
                return CategoryResource::collection($category);
            } catch (\Exception $e) {
                return $this->errorExceptionMessage();
            }

    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        try {
           
            $category = $this->categoryService->show($slug);
            return $category;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    public function store(CategoryCreateRequest $request)
    {
        if(Auth::user()->role_id == '1'){
        $category = $this->categoryService->create($request);
        return new CategoryResource($category);
        }
        else {
            return abort(401);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryUpdateRequest $request, Category $category)
    {
      
        $category = $this->categoryService->update($request, $category);
        return new CategoryResource($category);
       

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if(Auth::user()->role_id == '1'){
        $this->categoryService->destroy($category);
        }
        else {
            return abort(401);
        }
    }
    
}
