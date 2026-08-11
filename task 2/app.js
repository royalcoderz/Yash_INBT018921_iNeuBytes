
const doctors = [
    { id: 1, name: "Dr. Sarah Jenkins", dept: "Cardiology", exp: "10 Years", fee: "$150", slots: ["09:00 AM", "11:00 AM", "02:00 PM"] },
    { id: 2, name: "Dr. Mark Sloan", dept: "Neurology", exp: "15 Years", fee: "$200", slots: ["10:00 AM", "01:00 PM", "04:00 PM"] },
    { id: 3, name: "Dr. Emily Chen", dept: "Pediatrics", exp: "8 Years", fee: "$120", slots: ["08:30 AM", "11:30 AM", "03:00 PM"] },
    { id: 4, name: "Dr. Gregory House", dept: "Orthopedics", exp: "20 Years", fee: "$250", slots: ["09:00 AM", "12:00 PM"] },
    { id: 5, name: "Dr. Lisa Cuddy", dept: "Cardiology", exp: "12 Years", fee: "$160", slots: ["10:30 AM", "02:30 PM", "05:00 PM"] },
    { id: 6, name: "Dr. James Wilson", dept: "Neurology", exp: "14 Years", fee: "$180", slots: ["09:30 AM", "01:30 PM"] }
];


const doctorContainer = document.getElementById('doctorContainer');
const searchInput = document.getElementById('searchInput');
const deptFilter = document.getElementById('deptFilter');

const bookingModal = document.getElementById('bookingModal');
const summaryModal = document.getElementById('summaryModal');
const closeBooking = document.getElementById('closeBooking');
const closeSummary = document.getElementById('closeSummary');
const btnDone = document.getElementById('btnDone');

const bookingForm = document.getElementById('bookingForm');
const timeSlotSelect = document.getElementById('timeSlot');


function displayDoctors(docsToDisplay) {
    doctorContainer.innerHTML = ""; 

    if(docsToDisplay.length === 0) {
        doctorContainer.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No doctors found matching your criteria.</p>";
        return;
    }

    docsToDisplay.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doctor-card';
        
       
        const initials = doc.name.split(' ').map(n => n[0]).join('').substring(0, 2);

        card.innerHTML = `
            <div class="doc-header">
                <div class="doc-avatar">${initials}</div>
                <div class="doc-info">
                    <h3>${doc.name}</h3>
                    <span class="dept">${doc.dept}</span>
                </div>
            </div>
            <div class="doc-details">
                <p><strong>Experience:</strong> ${doc.exp}</p>
                <p><strong>Consultation Fee:</strong> ${doc.fee}</p>
            </div>
            <button class="btn-primary" onclick="openBookingForm(${doc.id})">Book Appointment</button>
        `;
        doctorContainer.appendChild(card);
    });
}


function filterDoctors() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDept = deptFilter.value;

    const filtered = doctors.filter(doc => {
        const matchesName = doc.name.toLowerCase().includes(searchTerm);
        const matchesDept = selectedDept === "All" || doc.dept === selectedDept;
        return matchesName && matchesDept;
    });

    displayDoctors(filtered);
}

searchInput.addEventListener('input', filterDoctors);
deptFilter.addEventListener('change', filterDoctors);



function openBookingForm(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if(!doctor) return;

   
    document.getElementById('doctorId').value = doctor.id;
    document.getElementById('selectedDoctorName').innerText = `Consulting with ${doctor.name}`;
    
   
    timeSlotSelect.innerHTML = "<option value=''>Select a time</option>";
    doctor.slots.forEach(slot => {
        timeSlotSelect.innerHTML += `<option value="${slot}">${slot}</option>`;
    });

    bookingModal.style.display = 'flex';
}


bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const docId = parseInt(document.getElementById('doctorId').value);
    const doctor = doctors.find(d => d.id === docId);
    
    const appointmentData = {
        patientName: document.getElementById('patientName').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('timeSlot').value,
        doctorName: doctor.name,
        department: doctor.dept,
        fee: doctor.fee
    };

    // Save to LocalStorage
    saveAppointment(appointmentData);

   
    bookingModal.style.display = 'none';
    showSummary(appointmentData);
});


function showSummary(data) {
    const summaryDetails = document.getElementById('summaryDetails');
    summaryDetails.innerHTML = `
        <p><strong>Patient Name:</strong> ${data.patientName}</p>
        <p><strong>Doctor:</strong> ${data.doctorName} (${data.department})</p>
        <p><strong>Date & Time:</strong> ${data.date} at ${data.time}</p>
        <p><strong>Total Fee:</strong> ${data.fee}</p>
    `;
    summaryModal.style.display = 'flex';
    bookingForm.reset();
}

function saveAppointment(data) {
    let history = JSON.parse(localStorage.getItem('appointments')) || [];
    history.push(data);
    localStorage.setItem('appointments', JSON.stringify(history));
}


closeBooking.addEventListener('click', () => bookingModal.style.display = 'none');
closeSummary.addEventListener('click', () => summaryModal.style.display = 'none');
btnDone.addEventListener('click', () => summaryModal.style.display = 'none');

window.onclick = function(event) {
    if (event.target === bookingModal) bookingModal.style.display = 'none';
    if (event.target === summaryModal) summaryModal.style.display = 'none';
}

// Initialize Page
displayDoctors(doctors);

// Prevent selecting past dates in HTML5 date input
document.getElementById('appointmentDate').min = new Date().toISOString().split("T")[0];
