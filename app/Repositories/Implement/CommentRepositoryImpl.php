<?php

namespace App\Repositories\Implement;
use App\Comment;
use App\Repositories\CommentRepository;
use App\Repositories\Eloquent\EloquentRepository;
use Illuminate\Database\Eloquent\Builder;

// use App\Http\Resources\Comment as CommentResource;


class CommentRepositoryImpl extends EloquentRepository implements CommentRepository
{
    /**
     * Certain model.
     *
     * @return string
     */
    public function getModel()
    {
        return Comment::class;
    }

    public function searchComment($request)
    {
        try {
                $comment =  $this->model::when($request->has('search'), function($query){
                    $query->where('id', 'LIKE', '%' . request('search') . '%')
                    ->orWhere('comment', 'LIKE', '%' . request('search') . '%')
                    ->orWhereHas('user', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    })
                    ->orWhereHas('products', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    });
                })->paginate(10)->withQueryString();
           
        } catch (\Exception $e) {
            return null;
        }
        return $comment;
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

    public function update($data, $comment)
    {
        try
        {
    
            $comment->update($data);
        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
        return $comment->fresh();
    }

    public function destroy($comment)
    {
        try {
            $comment->destroy();
        } catch (\Exception $e) {
            return null;
        }
    }
   
}