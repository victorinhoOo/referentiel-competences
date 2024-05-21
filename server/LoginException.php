<?php
require_once("ApiException.php");
class LoginException extends ApiException
{
    public function __construct(){
        parent::__construct(401,"Bad login or password");
    }
}
?>