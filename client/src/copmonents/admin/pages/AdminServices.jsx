import React, { useEffect, useState } from "react";
import { Row, Col, Form, Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const AdminServices = () => {

  const [services, setServices] = useState([]);

  const [serviceData, setServiceData] = useState({
    serviceName: "",
    duration: "",
    description: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  // GET SERVICES
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/service");
      setServices(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  // ADD OR UPDATE SERVICE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (isEditMode) {
        await axios.put(
          `http://localhost:8000/api/admin/service/${serviceId}`,
          serviceData
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/admin/service",
          serviceData
        );
      }

      fetchServices();

      setServiceData({
        serviceName: "",
        duration: "",
        description: "",
      });

      setIsEditMode(false);
      setServiceId(null);

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT SERVICE
  const handleEdit = (service) => {
    setServiceData({
      serviceName: service.serviceName,
      duration: service.duration,
      description: service.description,
    });

    setServiceId(service._id);
    setIsEditMode(true);
  };

  // DELETE SERVICE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/admin/service/${id}`);
      fetchServices();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">

      <h2 className="mb-4">
        {isEditMode ? "Edit Service" : "Add Service"}
      </h2>

      <Form onSubmit={handleSubmit}>

        <Row className="mb-3">

          <Col md={6}>
            <Form.Group>
              <Form.Label>Service Name</Form.Label>
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
              <Form.Label>Duration</Form.Label>
              <Form.Control
                name="duration"
                value={serviceData.duration}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

        </Row>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
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

      <Table striped bordered hover>

        <thead>
          <tr>
            <th>Service Name</th>
            <th>Duration</th>
            <th>Description</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>

          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service._id}>
                <td>{service.serviceName}</td>
                <td>{service.duration}</td>
                <td>{service.description}</td>

                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(service)}
                    className="me-2"
                  >
                    <MdEdit />
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(service._id)}
                  >
                    <MdDelete />
                  </Button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No services available
              </td>
            </tr>
          )}

        </tbody>

      </Table>

    </Container>
  );
};

export default AdminServices;