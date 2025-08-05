document.addEventListener('DOMContentLoaded', function() {
    // Form Navigation
    const form = document.getElementById('application-form');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.application-steps .step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const addEducationBtn = document.querySelector('.add-education');
    const educationContainer = document.querySelector('.education-history');
    
    let currentStep = 0;

    // Initialize form
    showStep(currentStep);

    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
                updateStepIndicator();
            }
        });
    });

    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
            updateStepIndicator();
        });
    });

    // Add another education item
    addEducationBtn.addEventListener('click', function() {
        const newItem = document.createElement('div');
        newItem.className = 'education-item';
        newItem.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label>Institution Name</label>
                    <input type="text" name="institution[]" required>
                </div>
                <div class="form-group">
                    <label>Degree/Certificate</label>
                    <input type="text" name="degree[]" required>
                </div>
                <div class="form-group">
                    <label>Field of Study</label>
                    <input type="text" name="field[]" required>
                </div>
                <div class="form-group">
                    <label>Year Completed</label>
                    <input type="number" name="year[]" min="1900" max="2099" required>
                </div>
            </div>
        `;
        educationContainer.insertBefore(newItem, addEducationBtn);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the data to a server here
        // For demonstration, we'll just show the confirmation message
        
        // Hide all steps
        steps.forEach(step => {
            step.style.display = 'none';
        });
        
        // Show confirmation message
        document.querySelector('.confirmation-message').style.display = 'block';
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Helper functions
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
        
        // On the last step, update the review sections
        if (stepIndex === 4) {
            updateReviewSections();
        }
    }

    function updateStepIndicator() {
        stepIndicators.forEach((indicator, index) => {
            if (index <= currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function validateStep(stepIndex) {
        const currentStep = steps[stepIndex];
        const inputs = currentStep.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
                
                // Reset border color when user starts typing
                input.addEventListener('input', function() {
                    this.style.borderColor = '#ddd';
                });
            }
        });
        
        return isValid;
    }

    function updateReviewSections() {
        // Personal Information
        const personalInfo = `
            <p><strong>Name:</strong> ${form['first-name'].value} ${form['last-name'].value}</p>
            <p><strong>Email:</strong> ${form['email'].value}</p>
            <p><strong>Phone:</strong> ${form['phone'].value}</p>
            <p><strong>Date of Birth:</strong> ${form['dob'].value}</p>
            <p><strong>Address:</strong> ${form['address'].value}</p>
        `;
        document.getElementById('review-personal').innerHTML = personalInfo;
        
        // Academic History
        const institutions = document.querySelectorAll('input[name="institution[]"]');
        let academicInfo = '';
        
        institutions.forEach((institution, index) => {
            academicInfo += `
                <p><strong>Institution ${index + 1}:</strong> ${institution.value}</p>
                <p><strong>Degree:</strong> ${document.querySelectorAll('input[name="degree[]"]')[index].value}</p>
                <p><strong>Field:</strong> ${document.querySelectorAll('input[name="field[]"]')[index].value}</p>
                <p><strong>Year:</strong> ${document.querySelectorAll('input[name="year[]"]')[index].value}</p>
                ${index < institutions.length - 1 ? '<hr>' : ''}
            `;
        });
        
        document.getElementById('review-academic').innerHTML = academicInfo;
        
        // Program Selection
        const programInfo = `
            <p><strong>Application Type:</strong> ${form['application-type'].options[form['application-type'].selectedIndex].text}</p>
            <p><strong>Program:</strong> ${form['program'].options[form['program'].selectedIndex].text}</p>
            <p><strong>Start Term:</strong> ${form['start-term'].options[form['start-term'].selectedIndex].text}</p>
        `;
        document.getElementById('review-program').innerHTML = programInfo;
        
        // Documents
        const documentsInfo = `
            <p><strong>Transcripts:</strong> ${form['transcripts'].files.length ? form['transcripts'].files[0].name : 'Not uploaded'}</p>
            <p><strong>Recommendation Letters:</strong> ${form['recommendations'].files.length} files uploaded</p>
            <p><strong>Personal Statement:</strong> ${form['statement'].files.length ? form['statement'].files[0].name : 'Not uploaded'}</p>
            <p><strong>ID Document:</strong> ${form['id'].files.length ? form['id'].files[0].name : 'Not uploaded'}</p>
        `;
        document.getElementById('review-documents').innerHTML = documentsInfo;
    }
});