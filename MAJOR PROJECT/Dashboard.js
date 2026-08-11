import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {appointments.map(a => (
          <li key={a._id}>
            Patient: {a.patientId?.name}, Doctor: {a.doctorId?.name}, Date: {a.date}, Status: {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
