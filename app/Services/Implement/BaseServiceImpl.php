<?php

namespace App\Services\Implement;

use App\Services\BaseService;

abstract class BaseServiceImpl implements BaseService
{
    protected $modelRepository;

    public function __construct()
    {

    }

    public function getAll()
    {
        return $this->modelRepository->getAll();
    }

    public function getAllWithTrashed()
    {
        return $this->modelRepository->getAllWithTrashed();
    }

    public function getAllOnlyTrashed()
    {
        return $this->modelRepository->getAllOnlyTrashed();
    }

    public function findById($id)
    {
        return $this->modelRepository->findById($id);
    }

    public function findByIdWithTrashed($id)
    {
        return $this->modelRepository->findByIdWithTrashed($id);
    }

    public function findByIdOnlyTrashed($id)
    {
        return $this->modelRepository->findByIdOnlyTrashed($id);
    }

    public function create($request)
    {
        return $this->modelRepository->create($request);
    }

    public function update($request, $object)
    {
        return $this->modelRepository->update($request, $object);
    }

    public function destroy($object)
    {
        return $this->modelRepository->destroy($object);
    }

    public function forceDestroy($object)
    {
        return $this->modelRepository->forceDestroy($object);
    }

    public function restoreSoftDelete($id)
    {
        return $this->modelRepository->restoreSoftDelete($id);
    }

    public function permanentDestroySoftDeleted($id)
    {
        return $this->modelRepository->permanentDestroySoftDeleted($id);
    }
}
