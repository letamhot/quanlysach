<?php

namespace App\Services\Implement;

use App\Repositories\ProducerRepository;
use App\Services\ProducerService;
use Illuminate\Support\Str;
class ProducerServiceImpl extends BaseServiceImpl implements ProducerService
{
    
    public function __construct(ProducerRepository $producerRepository)
    {
        $this->modelRepository = $producerRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function searchProducer($request)
    {
            return $this->modelRepository->searchProducer($request);
           
            
       
    }
    public function create($request)
    {
        try
        {   
            
            $producer = $request->except('image');
        
            if ($request->hasFile('image')) {
                $producer['image'] = $this->image($request);
            }
            $producer['slug'] = Str::slug($request->name);
            return $this->modelRepository->create($producer);
           

        }
        catch (\Exception $e) {
            return $e->getMessage();
            // return null;
        }
    }
     public function update($request, $producer)
    {
            $data = $request->except('image');
        
            if ($request->hasFile('image')) {
                $data['image'] = $this->image($request);
            }
            $producer['slug'] = Str::slug($request->name);

            return $this->modelRepository->update($data, $producer);
            
    }
    public function destroy($producer)
    {
        try {
            $producer->delete();
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