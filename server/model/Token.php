<?php
require_once("user.php");

/**
 * an authentication token 
 */
class Token{
    private const KEY="this is a simple key";
    private static string $iv="ABCDEFGHIJKLMNOP";

    private string $header ;
    private User $connectedUser;
    private string $signature;

    /**
     * Create a token from an known user
     * @param User $user the user connected
     */
    public function __construct(User $user)
    {
        $this->header = "TokenSkill";
        $this->connectedUser = $user;
        $this->signature = $this->crypt($this->header.json_encode($user));
    }

    private function crypt(string $msg) : string{
        $method = "aes-128-cbc";
        $crypted = openssl_encrypt($msg,$method,Token::KEY,0,Token::$iv);
        return $crypted;
    }

    /**
     * Check validity of token
     * @return bool true if token is valid
     */
    public function checkToken():bool{
        $test_signature = $this->crypt($this->header.json_encode($this->connectedUser));
        $signature_ok = $test_signature==$this->signature;
        $header_ok = $this->header=="TokenSkill";
        $user_ok = true; // todo improve that
        return $signature_ok && $header_ok && $user_ok;
    }

    /**
     * COnvert to string
     * @return string
     */
    public function __toString():string{
        return $this->signature;
    }

    /**
     * Convert to associative array
     * @return array
     */
    public function toArray():array{
        return ["header"=>$this->header,"connectedUser"=>$this->connectedUser->toArray(),"signature"=>$this->signature];
    }

    /**
     * Create from associative array
     * @param mixed $array 
     * @return Token
     */
    public static function createFromArray($array):Token{
        $arrayUser = $array["user"];
        $user = User::createFromArray($arrayUser);
        $token = new Token($user);
        $token->signature = $array["signature"];
        $token->header = $array["header"];
        return $token;
    }

    /**
     * Create from a stdClass object
     * @param mixed $obj object with same properties
     * @return Token the token
     */
    public static function createFromObject($obj):Token{
        $objUser = $obj->connectedUser;
        $user = User::createFromObject($objUser);
        $token = new Token($user);
        $token->signature = $obj->signature;
        $token->header = $obj->header;
        return $token;
    }
    /**
     * Tell if user has this role
     * @param string $role tested role
     * @return bool true if connected user has this role
     */
    public function hasRole(string $role) : bool{
        return $this->connectedUser->hasRole($role);
    }

    /**
     * Gets the name of the connected user
     * @return string
     */
    public function getUsername():string{
        return $this->connectedUser->getName();
    }
}
?>