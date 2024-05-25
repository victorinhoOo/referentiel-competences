<?php
require_once("controllers/department_controller.php");
require_once("sgbd/department_dao.php");
require_once("sgbd/database.php");
require_once("controllers/skills_controller.php");
require_once("sgbd/skills_dao.php");
require_once("ApiException.php");
require_once("model/skillset.php");
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
        else if($_GET["action"]=="add_skillset"){
            $body = file_get_contents("php://input");
            $array = json_decode($body);
            $skillset = SkillSet::createFromObject($array);
            $skillsController->addSkillSet($skillset);
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
    http_response_code($e->getStatus());
    echo $e->getMessage();
}
catch(Exception | Error $e2){
    http_response_code(500);
    echo $e2->getMessage();
}
?>