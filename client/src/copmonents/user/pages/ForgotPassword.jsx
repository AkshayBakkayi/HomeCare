import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:8000/api/user/forgot-password",
        { email }
      );

      setMessage(res.data.message);
      setError("");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">

          <Card className="p-4 shadow border-0">

            <h4 className="text-center mb-3">Forgot Password</h4>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </Form.Group>

              <Button type="submit" className="w-100">
                Send Reset Link
              </Button>

            </Form>

          </Card>

        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;