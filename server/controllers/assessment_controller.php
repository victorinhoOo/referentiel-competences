<?php
require_once("./model/assessment_service.php");
/**
 * Controller for assessments
 */
class AssessmentController
{
    private AssessmentService $service;

    /**
     * Init the controller
     * @param AssessmentService $service  service used for managing data
     */
    public function __construct(AssessmentService $service){
        $this->service = $service;
    }

    /**
     * Store an assessment
     * @param mixed $obj object with needed data
     */
    public function storeAssessment($obj){
        $this->service->addAssessment($obj);
    }
}
?>