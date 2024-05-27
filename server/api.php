<?php
require_once("controllers/department_controller.php");
require_once("sgbd/department_dao.php");
require_once("sgbd/database.php");
require_once("controllers/skills_controller.php");
require_once("sgbd/skills_dao.php");
require_once("ApiException.php");
require_once("model/skillset.php");
require_once("controllers/user_controller.php");
require_once("sgbd/user_dao.php");
require_once("model/Token.php");
require_once("AuthorizeException.php");
require_once("controllers/assessment_controller.php");
require_once("sgbd/assessment_dao.php");

try{
    $db = new Database();
    $deptController = new DepartmentController(new DepartmentService(new DepartmentDao($db)));
    $skillsController = new SkillsController(new SkillsService(new SkillsDao($db)));
    $userController = new UserController(new UserService(new UserDao($db)));
    $assessmentController = new AssessmentController(new AssessmentService(new AssessmentDao($db)));
    $token = null;

    if (isset($_GET["action"])) {
        if ($_GET["action"] == "get_depts") {
            $deptController->getDepartments();
        }
        else if ($_GET["action"] == "get_skillsets" && isset($_GET["code"])) {
            $code = $_GET["code"];
            $skillsController->getSkillsSet($code);
        }
        else if($_GET["action"]=="add_skillset"){
            $body = file_get_contents("php://input");
            $array = json_decode($body);
            $obj = $array->token;
            if($obj==null) throw new AuthorizeException("No token found");
            $token = Token::createFromObject($obj);
            $set = $array->skillSet;
            $skillset = SkillSet::createFromObject($set);
            $skillsController->addSkillSet($skillset, $token);
        }
        else if($_GET["action"]=="login"){
            $login = $_GET["login"];
            $password = $_GET["password"];
            $userController->connect($login, $password);
        }
        else if($_GET["action"]=="get_skillset"){
            $id = $_GET["id"];
            $skillsController->getSkillSet($id);
        }
        else if($_GET["action"]=="add_assessment"){
            $body = file_get_contents("php://input");
            $array = json_decode($body,true);
            $obj = $array["assessment"];
            if($obj==null) throw new ApiException(405,"missing assessment");
            $assessmentController->storeAssessment($obj);            
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