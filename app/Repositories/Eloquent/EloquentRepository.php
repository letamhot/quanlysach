<?php

namespace App\Repositories\Eloquent;

use App\Repositories\BaseRepository;

abstract class EloquentRepository implements BaseRepository
{
    protected $model;

    public function __construct()
    {
        $this->setModel();
    }

    abstract public function getModel();

    public function setModel()
    {
        $this->model = app()->make($this->getModel());
    }

    public function getAll()
    {
        try {
            return $this->model::all();
        } catch (\Exception $e) {
            return null;
        }
    }

    public function getAllWithTrashed()
    {
        try {
            return $this->model->withTrashed()->get();
        } catch (\Exception $e) {
            return null;
        }
    }


    public function getAllOnlyTrashed()
    {
        try {
            return $this->model->onlyTrashed()->get();
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findById($id)
    {
        try {
            return $this->model->findOrFail($id);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function findByIdWithTrashed($id)
    {
        try {
            return $this->model->withTrashed()->findOrFail($id);
        } catch (\Exception $e) {
            return null;
        }
    }

    public function findByIdOnlyTrashed($id)
    {
        try {
            return $this->model->onlyTrashed()->findOrFail($id);
        } catch (\Exception $e) {
            return null;
        }
    }



    public function create($request)
    {
        try {
            return $this->model->create($request);
        } catch (\Exception $e) {
            return null;
        }
    }

    public function update($request, $object)
    {
        try {
             $object->update($request);
        } catch (\Exception $e) {
            return null;
        }
        return $object->fresh();
    }

    public function destroy($object)
    {
        try {
            return $object->delete();
        } catch (\Exception $e) {
            return null;
        }
    }

    public function forceDestroy($object)
    {
        try {
            return $object->forceDelete();
        } catch (\Exception $e) {
            return null;
        }
    }

    public function restoreSoftDelete($id)
    {
        try {
            return $this->findByIdOnlyTrashed($id)->restore();
        } catch (\Exception $e) {
            return null;
        }
    }

    public function permanentDestroySoftDeleted($id)
    {
        try {
            $object = $this->findByIdOnlyTrashed($id);

            return $this->forceDestroy($object);
        } catch (\Exception $e) {
            return null;
        }
    }
}
