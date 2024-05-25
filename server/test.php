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
</body>
</html>
<?php

?>