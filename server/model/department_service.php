<?php
require_once("department_data.php");

/**
 * Service to departments
 */
class DepartmentService{
    private DepartmentData $data;

    /**
     * Init the service
     * @param DepartmentData $data the repository containg data
     */
    public function __construct(DepartmentData $data){
        $this->data = $data;
    }

    /**
     * Get all the departments
     * @return array of departments
     */
    public function getAll(): array
    {
        return $this->data->getAll();
    }

}
?>