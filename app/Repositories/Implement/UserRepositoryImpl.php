<?php

namespace App\Repositories\Implement;
use App\User;
use App\Repositories\UserRepository;
use App\Repositories\Eloquent\EloquentRepository;
use Illuminate\Database\Eloquent\Builder;

// use App\Http\Resources\User as UserResource;


class UserRepositoryImpl extends EloquentRepository implements UserRepository
{
    /**
     * Certain model.
     *
     * @return string
     */
    public function getModel()
    {
        return User::class;
    }

    public function searchUser($request)
    {
        try {
                $user =  $this->model::when($request->has('search'), function($query){
                    $query->where('id', 'LIKE', '%' . request('search') . '%')
                    ->orWhere('name', 'LIKE', '%' . request('search') . '%')
                    ->orWhere('email', 'LIKE', '%' . request('search') . '%')
                    ->orWhereHas('role', function(Builder $q){
                        $q->where('name', 'LIKE', '%' . request('search') . '%');
                    });
                })->paginate(10)->withQueryString();

        } catch (\Exception $e) {
            return null;
        }
        // dd($user);
        return $user;

    }

    public function create($data)
    {
    

    }

    public function update($data, $user)
    {
        try
        {
    
            $user->update($data);
        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
        return $user->fresh();
    }

    public function destroy($user)
    {
        try {
            $user->destroy();
        } catch (\Exception $e) {
            return null;
        }
    }
   
}