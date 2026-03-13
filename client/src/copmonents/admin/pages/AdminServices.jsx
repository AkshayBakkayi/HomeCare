import React, { useEffect, useState } from "react";
import { Row, Col, Form, Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const AdminServices = () => {

  const [services, setServices] = useState([]);

  const [serviceData, setServiceData] = useState({
    serviceName: "",
    icon: "",
    description: ""
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [serviceId, setServiceId] = useState(null);


  useEffect(() => {
    fetchServices();
  }, []);


  const fetchServices = async () => {

    const res = await axios.get("http://localhost:8000/api/admin/service");

    setServices(res.data.data);

  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setServiceData({
      ...serviceData,
      [name]: value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {
      ...serviceData,
      description: serviceData.description.split("\n")
    };


    if (isEditMode) {

      await axios.put(
        `http://localhost:8000/api/admin/service/${serviceId}`,
        payload
      );

    } else {

      await axios.post(
        "http://localhost:8000/api/admin/service",
        payload
      );

    }

    fetchServices();

    setServiceData({
      serviceName: "",
      icon: "",
      description: ""
    });

    setIsEditMode(false);

  };


  const handleEdit = (service) => {

    setServiceData({
      serviceName: service.serviceName,
      icon: service.icon,
      description: service.description.join("\n")
    });

    setServiceId(service._id);

    setIsEditMode(true);

  };


  const handleDelete = async (id) => {

    await axios.delete(
      `http://localhost:8000/api/admin/service/${id}`
    );

    fetchServices();

  };


  return (
    <Container className="mt-5">

      <h2>{isEditMode ? "Edit Service" : "Add Service"}</h2>

      <Form onSubmit={handleSubmit}>

        <Row className="mb-3">

          <Col md={6}>
            <Form.Group>

              <Form.Label>Service Title</Form.Label>

              <Form.Control
                name="serviceName"
                value={serviceData.serviceName}
                onChange={handleChange}
                required
              />

            </Form.Group>
          </Col>


          <Col md={6}>
            <Form.Group>

              <Form.Label>Icon</Form.Label>

              <Form.Select
                name="icon"
                value={serviceData.icon}
                onChange={handleChange}
                required
              >

                <option value="">Select Icon</option>
                <option value="FaUserNurse">Nursing</option>
                <option value="FaHeartbeat">Physiotherapy</option>
                <option value="FaVials">Lab</option>
                <option value="FaHospitalUser">Patient Care</option>
                <option value="FaAmbulance">Emergency</option>

              </Form.Select>

            </Form.Group>
          </Col>

        </Row>


        <Form.Group>

          <Form.Label>Description (one per line)</Form.Label>

          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={serviceData.description}
            onChange={handleChange}
          />

        </Form.Group>


        <Button className="mt-3" type="submit">
          {isEditMode ? "Update Service" : "Add Service"}
        </Button>

      </Form>


      <h3 className="mt-5">Service List</h3>

      <Table bordered>

        <thead>
          <tr>
            <th>Service</th>
            <th>Icon</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>


        <tbody>

          {services.map((service) => (

            <tr key={service._id}>

              <td>{service.serviceName}</td>

              <td>{service.icon}</td>

              <td>{service.description.join(", ")}</td>

              <td>

                <Button
                  variant="warning"
                  onClick={() => handleEdit(service)}
                >
                  <MdEdit />
                </Button>

                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDelete(service._id)}
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

export default AdminServices;