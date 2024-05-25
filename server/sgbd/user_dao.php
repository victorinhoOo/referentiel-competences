<?php
require_once("database.php");
require_once("./model/user_data.php");
require_once("./LoginException.php");

/**
 * Storage layer, in mysql, of users
 */
class UserDao implements UserData
{
    private Database $db;

    /**
     * Create the layer
     * @param Database $db link to database 
     */
    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function getUser(string $login, string $password):mixed
    {
        $array = $this->db->query("SELECT * FROM user WHERE login=:login",["login"=>$login]);
        if(count($array)==0)
            throw new LoginException();
        $obj = $array[0];
        if(!password_verify($password,$obj["passwordHash"]))
        {
            throw new LoginException();
        }        
        return $obj;
    }
}

?>