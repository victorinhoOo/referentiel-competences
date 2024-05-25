<?php
require_once("user.php");
require_once("user_data.php");
require_once("token.php");

/**
 * Service to access users
 */
class UserService
{

    private UserData $dao;

    /**
     * Create the service
     * @param UserData $dao  link to storage layer
     */
    public function __construct(UserData $dao){
        $this->dao = $dao;
    }

    /**
     * Try to connect a user
     * @param string $login login of user
     * @param string $password password of user
     * @return Token an authentication token
     * @throws LoginException if bad login or password
     */
    public function connectUser(string $login, string $password) : Token
    {
        $array = $this->dao->getUser($login, $password);        
        $user = User::createFromArray($array);
        $token = new Token($user);
        return $token;
    }


}
?>