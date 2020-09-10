<?php

namespace App\Repositories;

interface ProducerRepository extends BaseRepository
{
    public function searchProducer($request);

}