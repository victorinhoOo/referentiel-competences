<?php
require_once("user.php");
/**
 * Link to storage layer of users
 */
interface UserData
{
    /**
     * Get the user, if known
     * @param string $login login of user
     * @param string $password password of user
     * @return mixed associative array with user's data, read from database
     * @throws LoginException if bad login and/or password
     */
    function getUser(string $login, string $password):mixed;
}
?>