document.addEventListener('DOMContentLoaded', () => {

  
    const navLinks = document.querySelectorAll('.nav-links a');
    const viewSections = document.querySelectorAll('.view-section');
    const menuToggle = document.getElementById('mobile-menu');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            
            navLinks.forEach(l => l.classList.remove('active'));
            viewSections.forEach(v => v.classList.remove('active-view'));
            
            
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-view');

            if(window.innerWidth <= 768) sidebar.classList.remove('show');
        });
    });

    
    const docFormContainer = document.getElementById('doctorFormContainer');
    const docForm = document.getElementById('doctorForm');
    const btnOpenForm = document.getElementById('openDoctorForm');
    const btnCancelForm = document.getElementById('cancelDoctorForm');
    const doctorTableBody = document.getElementById('doctorTableBody');
    const searchInput = document.getElementById('searchDoctor');
    const statDoctors = document.getElementById('stat-doctors');

    let doctors = JSON.parse(localStorage.getItem('admin_doctors')) || [];
    let isEditing = false;

    
    btnOpenForm.addEventListener('click', () => {
        docForm.reset();
        document.getElementById('docId').value = '';
        document.getElementById('formTitle').innerText = 'Add New Doctor';
        isEditing = false;
        docFormContainer.style.display = 'block';
    });

    btnCancelForm.addEventListener('click', () => {
        docFormContainer.style.display = 'none';
    });

    
    function updateStats() {
        statDoctors.innerText = doctors.length;
        // You would replicate this for patients, appointments, etc.
    }

    
    function renderDoctors(data = doctors) {
        doctorTableBody.innerHTML = '';
        
        if (data.length === 0) {
            doctorTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No doctors found.</td></tr>';
            return;
        }

        data.forEach(doc => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${doc.id}</td>
                <td>${doc.name}</td>
                <td>${doc.dept}</td>
                <td>${doc.exp} yrs</td>
                <td>
                    <button class="btn-edit" onclick="editDoctor(${doc.id})">Edit</button>
                    <button class="btn-danger" onclick="deleteDoctor(${doc.id})">Delete</button>
                </td>
            `;
            doctorTableBody.appendChild(tr);
        });
        updateStats();
    }

    
    docForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const idInput = document.getElementById('docId').value;
        const name = document.getElementById('docName').value.trim();
        const dept = document.getElementById('docDept').value.trim();
        const exp = document.getElementById('docExp').value.trim();

        if (isEditing && idInput) {
          
            const index = doctors.findIndex(d => d.id == idInput);
            if (index !== -1) {
                doctors[index] = { id: parseInt(idInput), name, dept, exp };
            }
        } else {
            
            const newId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 101;
            doctors.push({ id: newId, name, dept, exp });
        }

        saveToLocalStorage();
        renderDoctors();
        docFormContainer.style.display = 'none';
    });

    
    window.editDoctor = function(id) {
        const doc = doctors.find(d => d.id === id);
        if(!doc) return;

        document.getElementById('docId').value = doc.id;
        document.getElementById('docName').value = doc.name;
        document.getElementById('docDept').value = doc.dept;
        document.getElementById('docExp').value = doc.exp;
        
        document.getElementById('formTitle').innerText = 'Edit Doctor Details';
        isEditing = true;
        docFormContainer.style.display = 'block';
    }

    window.deleteDoctor = function(id) {
        if(confirm('Are you sure you want to delete this doctor?')) {
            doctors = doctors.filter(d => d.id !== id);
            saveToLocalStorage();
            renderDoctors();
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('admin_doctors', JSON.stringify(doctors));
    }

    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = doctors.filter(d => 
            d.name.toLowerCase().includes(term) || 
            d.dept.toLowerCase().includes(term)
        );
        renderDoctors(filtered);
    });

    // Initial Render
    renderDoctors();
});
