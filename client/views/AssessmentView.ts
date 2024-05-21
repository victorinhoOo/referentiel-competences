class AssessmentView{
    public constructor() {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = '/skills/login.html'; 
        }

        const skillSetId = sessionStorage.getItem('skillset');
        if (!skillSetId) {
            alert('No skill set selected. Redirecting to the main page.');
            window.location.href = '/skills/index.html';
        }
        console.log('Retrieved skill set ID:', skillSetId);
    }
}