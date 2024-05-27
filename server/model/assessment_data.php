<?php
/**
 * Interface to storage layer
 */
interface AssessmentData
{
    /**
     * Add an assessment to the database
     * @param mixed $obj the assesment in raw data
     */
    function addAssessment($obj);
}
?>