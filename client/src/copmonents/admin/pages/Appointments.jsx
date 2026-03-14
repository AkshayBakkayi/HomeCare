import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";

const AdminAppointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [teams, setTeams] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    serviceId: "",
    appointmentDate: "",
    status: "pending",
    teamId: ""
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);


  useEffect(() => {
    fetchAppointments();
    fetchServices();
    fetchTeams();
  }, []);


  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {

    const res = await axios.get(
      "http://localhost:8000/api/admin/appointment"
    );

    setAppointments(res.data.data);
  };


  // FETCH SERVICES
  const fetchServices = async () => {

    const res = await axios.get(
      "http://localhost:8000/api/admin/service"
    );

    setServices(res.data.data);
  };


  // FETCH TEAM (DOCTORS)
  const fetchTeams = async () => {

    const res = await axios.get(
      "http://localhost:8000/api/admin/team"
    );

    setTeams(res.data.data);
  };


  // HANDLE INPUT
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  // ADD OR UPDATE
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (isEditMode) {

      await axios.put(
        `http://localhost:8000/api/admin/appointment/${appointmentId}`,
        formData
      );

    } else {

      await axios.post(
        "http://localhost:8000/api/admin/appointment",
        formData
      );

    }

    fetchAppointments();

    setFormData({
      patientName: "",
      phone: "",
      serviceId: "",
      appointmentDate: "",
      status: "pending",
      teamId: ""
    });

    setIsEditMode(false);
  };


  // EDIT
  const handleEdit = (a) => {

    setFormData({
      patientName: a.patientName,
      phone: a.phone,
      serviceId: a.serviceId?._id,
      appointmentDate: a.appointmentDate?.split("T")[0],
      status: a.status,
      teamId: a.teamId?._id
    });

    setAppointmentId(a._id);
    setIsEditMode(true);
  };


  // DELETE
  const handleDelete = async (id) => {

    if (!window.confirm("Delete appointment?")) return;

    await axios.delete(
      `http://localhost:8000/api/admin/appointment/${id}`
    );

    fetchAppointments();
  };


  return (

    <Container className="mt-5">

      <h2 className="mb-4">
        {isEditMode ? "Edit Appointment" : "Add Appointment"}
      </h2>


      <Form onSubmit={handleSubmit}>

        <Row className="mb-3">

          {/* PATIENT NAME */}
          <Col md={4}>
            <Form.Group>

              <Form.Label>Patient Name</Form.Label>

              <Form.Control
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />

            </Form.Group>
          </Col>


          {/* PHONE */}
          <Col md={4}>
            <Form.Group>

              <Form.Label>Phone</Form.Label>

              <Form.Control
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </Form.Group>
          </Col>


          {/* SERVICE */}
          <Col md={4}>
            <Form.Group>

              <Form.Label>Service</Form.Label>

              <Form.Select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                required
              >

                <option value="">Select Service</option>

                {services.map(service => (

                  <option key={service._id} value={service._id}>
                    {service.serviceName}
                  </option>

                ))}

              </Form.Select>

            </Form.Group>
          </Col>

        </Row>


        <Row className="mb-3">

          {/* DATE */}
          <Col md={4}>
            <Form.Group>

              <Form.Label>Date</Form.Label>

              <Form.Control
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />

            </Form.Group>
          </Col>


          {/* STATUS */}
          <Col md={4}>
            <Form.Group>

              <Form.Label>Status</Form.Label>

              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="assigned">Assigned</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>

              </Form.Select>

            </Form.Group>
          </Col>


          {/* ASSIGN DOCTOR */}
          <Col md={4}>
            <Form.Group>

              <Form.Label>Assign Doctor</Form.Label>

              <Form.Select
                name="teamId"
                value={formData.teamId}
                onChange={handleChange}
              >

                <option value="">Select Doctor</option>

                {teams.map(team => (

                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>

                ))}

              </Form.Select>

            </Form.Group>
          </Col>

        </Row>


        <Button type="submit">
          {isEditMode ? "Update Appointment" : "Add Appointment"}
        </Button>

      </Form>


      {/* APPOINTMENT TABLE */}

      <h3 className="mt-5">Appointments</h3>

      <Table bordered hover>

        <thead>
          <tr>
            <th>Patient</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {appointments.map(a => (

            <tr key={a._id}>

              <td>{a.patientName}</td>
              <td>{a.phone}</td>

              <td>
                {a.serviceId?.serviceName}
              </td>

              <td>
                {new Date(a.appointmentDate)
                  .toLocaleDateString()}
              </td>

              <td>{a.status}</td>

              <td>
                {a.teamId?.name}
              </td>

              <td>

                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(a)}
                >
                  <MdEdit />
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleDelete(a._id)}
                >
                  <MdDelete />
                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </Table>

    </Container>
  );
};

export default AdminAppointments;