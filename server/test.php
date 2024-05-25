<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>R4.10 - test page</title>
</head>
<body>
    <h1>R4.10 test page</h1>
    <hr />
    <h2>Test of database initialisation</h2>
    <p>The database initialisation  <span>
    <?php
    require_once("sgbd/database.php");
    try {
        $db = new Database();
        $db->query("SELECT * FROM department",array());
        echo "was successful";
    }
    catch(Exception $pdoex)
    {
        echo "failed with this message :".$pdoex->getMessage();
    }
    ?>
    </span></p>
    <hr />
    <h2>Test of database upgrade for TP2</h2>
    <p>The database upgrade <span>
    <?php
    try{
        $db = new Database();
        $db->query("SELECT * FROM component",array());
        echo "was successful";
    } 
    catch (Exception $pdoex) 
    {
        echo "failed with this message :" . $pdoex->getMessage();
    }
    ?>
    </span></p><hr />
    <h2>Test of database upgrade for TP3</h2>
    <p>
        The database upgrade <span>
                                 <?php
            require_once("sgbd/user_dao.php");
            require_once("model/user_service.php");
            require_once("ApiException.php");
            require_once("controllers/user_controller.php");
            try{
                $db = new Database();
                $dao = new UserDao($db);
                $obj= $dao->getUser("toto",'password');
                if($obj == null) throw new ApiException(401,"Unabled to authenticate");
                $service = new UserService($dao);
                $token = $service->connectUser("toto","password");
                if($token==null) throw new ApiException(500,"Service error");
                $controller = new UserController($service);
                echo "was successful. Example of token for user toto : ";
                $controller->connect("toto","password");
            }
            catch (Exception $pdoex)
            {
                echo "failed with this message :" . $pdoex->getMessage();
            }
                                 ?>
        </span>
    </p><hr />
</body>
</html>
<?php

?>