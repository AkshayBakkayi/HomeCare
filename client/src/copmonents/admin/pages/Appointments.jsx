import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/admin/appointments",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setAppointments(res.data); 
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:8000/api/admin/appointments/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchAppointments();
  };

  return (
    <>
      <h2>Appointments</h2>

      <Table bordered>
        <thead>
          <tr>
            <th>User</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id}>
              <td>{a.user?.name}</td>
              <td>{a.service?.title}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td>{a.status}</td>

              <td>
                <Button
                  size="sm"
                  onClick={() =>
                    updateStatus(a._id, "approved")
                  }
                >
                  Approve
                </Button>

                <Button
                  size="sm"
                  variant="success"
                  className="ms-2"
                  onClick={() =>
                    updateStatus(a._id, "completed")
                  }
                >
                  Complete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Appointments;