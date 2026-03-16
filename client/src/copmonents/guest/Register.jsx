import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    DOB: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {

      const res = await axios.post(
        "http://localhost:8000/api/user/register",
        {
          name: formData.name,
          mobile: formData.mobile,
          address: formData.address,
          email: formData.email,
          password: formData.password,
          DOB: formData.DOB
        }
      );

      setSuccess(res.data.message);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 top-margin 10px" >
      <Row className="w-100">
        <Col lg={5} md={7} sm={10} className="mx-auto">

          <Card className="shadow-lg border-0 p-4 rounded-4">

            <h3 className="text-center mb-4">Create Account</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="DOB"
                  placeholder="Date of Birth"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="phone"
                  name="mobile"
                  placeholder="Enter mobile number"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  placeholder="Enter your address"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Create Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Create password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 rounded-pill">
                Register
              </Button>

            </Form>

          </Card>

        </Col>
      </Row>
    </Container>
  );
};

export default Register;