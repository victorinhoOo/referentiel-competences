<?php
require_once("controllers/department_controller.php");
require_once("sgbd/department_dao.php");
require_once("sgbd/database.php");
require_once("controllers/skills_controller.php");
require_once("sgbd/skills_dao.php");
require_once("ApiException.php");

try{
    $db = new Database();
    $deptController = new DepartmentController(new DepartmentService(new DepartmentDao($db)));
    $skillsController = new SkillsController(new SkillsService(new SkillsDao($db)));

    if (isset($_GET["action"])) {
        if ($_GET["action"] == "get_depts") {
            $deptController->getDepartments();
        } else if ($_GET["action"] == "get_skillsets" && isset($_GET["code"])) {
            $code = $_GET["code"];
            $skillsController->getSkillsSet($code);
        }
        else{
            throw new ApiException(405,"Parameters not correct");
        }
    }
    else{
        throw new ApiException(400, "Bad request or unknown method");
    }
}
catch(ApiException $e){
    header($e->__toString());
    echo $e->getMessage();
}
catch(Exception $e2){
    header("HTTP/1.0 500 System error");
    echo $e->getMessage();
}
?>