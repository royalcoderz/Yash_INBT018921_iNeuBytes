document.addEventListener('DOMContentLoaded', () => {
    
  
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });


    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

 
    const form = document.getElementById('appointmentForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if(validateForm()) {
            alert('Appointment request submitted successfully!');
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        
        const name = document.getElementById('patientName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const department = document.getElementById('department');

        // Reset errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            group.querySelector('.error-msg').innerText = '';
        });

       
        if (name.value.trim() === '') {
            setError(name, 'Patient name is required');
            isValid = false;
        }

        
        if (email.value.trim() === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        }

       
        if (phone.value.trim() === '') {
            setError(phone, 'Phone number is required');
            isValid = false;
        }

        
        if (department.value === '') {
            setError(department, 'Please select a department');
            isValid = false;
        }

        return isValid;
    }

    function setError(element, message) {
        const formGroup = element.parentElement;
        formGroup.classList.add('error');
        formGroup.querySelector('.error-msg').innerText = message;
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
