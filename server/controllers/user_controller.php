<?php
require_once("./model/user_service.php");
class UserController
{
    private UserService $service;

    public function __construct(UserService $service){
        $this->service = $service;
    }
    public function connect(string $login, string $password) {
        $token = $this->service->connectUser($login, $password);
        $array = $token->toArray();
        echo json_encode($array);
    }
}
?>