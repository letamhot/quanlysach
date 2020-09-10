<?php

namespace App\Services\Implement;

use App\Repositories\UserRepository;
use App\Services\UserService;

class UserServiceImpl extends BaseServiceImpl implements UserService
{

    
    public function __construct(UserRepository $userRepository)
    {
        $this->modelRepository = $userRepository;
    }
    /**
     * Certain model.
     *
     * @return string
     */
    public function searchUser($request)
    {
            return $this->modelRepository->searchUser($request);
           
            
       
    }
    public function create($request)
    {
    
    }
     public function update($request, $user)
    {
            $data = $request->except('avatar');
        
            if ($request->hasFile('avatar')) {
                $data['avatar'] = $this->image($request);
            }
            // dd($data);
            return $this->modelRepository->update($data, $user);

    }
    public function destroy($user)
    {
        try {
            $user->delete();
        } catch (\Exception $e) {
            return null;
        }
    }
    private function image($request){
        $file = $request->file('avatar');
        $b64 = base64_encode(file_get_contents($file->path()));
        $ext = $file->getClientMimeType();
        $img = "data:$ext;base64, $b64";
        return $img;
    }
}