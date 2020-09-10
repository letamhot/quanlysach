<?php

namespace App\Services;

interface BaseService
{
    public function getAll();

    public function getAllWithTrashed();

    public function getAllOnlyTrashed();

    public function findById($id);

    public function findByIdWithTrashed($id);

    public function findByIdOnlyTrashed($id);

    public function create($request);

    public function update($request, $object);

    public function destroy($object);

    public function forceDestroy($object);

    public function restoreSoftDelete($id);

    public function permanentDestroySoftDeleted($id);
}
