<?php
require_once("./model/department_service.php");

/**
 * Controller for departements APIs
 */
class DepartmentController
{
    private DepartmentService $service;

    /**
     * Init the controller
     * @param DepartmentService $service the object service who can obtain datas
     */
    public function __construct(DepartmentService $service){
        $this->service = $service;
    }

    /**
     * Get all departments.
     * Http Response --> Json array
     */
    public function getDepartments() {
        $depts = $this->service->getAll();
        echo json_encode($depts);
    }
}
?>