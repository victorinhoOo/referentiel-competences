<?php
require_once("assessment_data.php");
/**
 * Service for assessments
 */
class AssessmentService
{
    private AssessmentData $dao;

    /**
     * Init the service
     * @param AssessmentData $dao object who manage storage of assessments
     */
    public function __construct(AssessmentData $dao)
    {
        $this->dao = $dao;
    }

    /**
     * Add an assessment into data set
     * @param mixed $obj the assessment in raw data
     */
    public function addAssessment($obj)
    {
        $this->dao->addAssessment($obj);
    }
}
?>