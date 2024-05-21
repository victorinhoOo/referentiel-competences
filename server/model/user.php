<?php
/**
 * A user of the app
 */
class User
{
    private string $login;
    private string $name;
    private string $type;

    /**
     * Create from an associative array
     * @param mixed $array associative array with same keys than user's properties
     * @return User 
     */
    public static function createFromArray($array){
        $user = new User();
        $user->login = $array["login"];
        $user->name = $array["name"];
        $user->type = $array["type"];
        return $user;
    }

    /**
     * Create from a std object
     * @param mixed $obj 
     * @return User
     */
    public static function createFromObject($obj){
        $user = new User();
        $user->login = $obj->login;
        $user->name = $obj->name;
        $user->type = $obj->type;
        return $user;
    }
    public function __toString():string{
        return $this->name;
    }

    /**
     * COnvert to associative array
     * @return array associative array with keys are user's properties
     */
    public function toArray():array{
        return ["login"=>$this->login,"name"=>$this->name,"type"=>$this->type];
    }

    /**
     * Tell if the user has this role
     * @param string $role 
     * @return bool true if user has this role
     */
    public function hasRole(string $role):bool{
        $ok=false;
        if($role=="student")
            $ok = $this->type=="student";
        else if($role=="teacher")
            $ok = $this->type=="teacher"||$this->type=="chief";
        else if($role=="chief")
            $ok = $this->type=="chief";
        return $ok;
    }

    /**
     * Gets the name of the user
     * @return string
     */
    public function getName():string{
        return $this->name;
    }
    
}
?>