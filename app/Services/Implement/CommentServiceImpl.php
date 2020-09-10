<?php

namespace App\Services\Implement;

use App\Repositories\CommentRepository;
use App\Services\CommentService;
use Illuminate\Support\Str;

class CommentServiceImpl extends BaseServiceImpl implements CommentService
{
    
    public function __construct(CommentRepository $commentRepository)
    {
        $this->modelRepository = $commentRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function searchComment($request)
    {
            return $this->modelRepository->searchComment($request);
           
            
       
    }
    public function create($request)
    {
        try
        {   
            
            $comment = $request->all();
            return $this->modelRepository->create($comment);
           

        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
    }

    public function update($request, $comment)
    {

    }
    public function destroy($comment)
    {
        try {
            $comment->delete();
        } catch (\Exception $e) {
            return null;
        }
    }
}