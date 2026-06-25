import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "https://homecare-yq1l.onrender.com/api/user/register",
        {
          name: formData.name,
          mobile: formData.mobile,
          address: formData.address,
          email: formData.email,
          password: formData.password,
          DOB: formData.DOB,
        }
      );

      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container
      fluid
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #e8f5e9)",
      }}
    >
      <Row className="justify-content-center align-items-center">
        <Col lg={8} md={10}>
          <Card
            className="shadow-lg border-0 rounded-4 overflow-hidden"
            style={{ maxWidth: "950px", margin: "0 auto" }}
          >
            <Row className="g-0">
              {/* Left Side */}
              <Col
                lg={5}
                className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-4"
                style={{
                  background:
                    "linear-gradient(135deg, #2a7035 0%, #4caf50 100%)",
                }}
              >
                <img
                  src="/assets/logo.jpeg"
                  alt="HomeCare"
                  width="120"
                  height="120"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "20px",
                    border: "4px solid #fff",
                  }}
                />

                <h2 className="fw-bold text-center">HomeCare</h2>

                <p className="text-center mt-3">
                  Join HomeCare and manage your healthcare appointments with
                  ease.
                </p>
              </Col>

              {/* Right Side */}
              <Col lg={7}>
                <Card.Body className="p-4 p-md-5">
                  <h2 className="text-center fw-bold mb-4">
                    Create Account
                  </h2>

                  {error && (
                    <Alert variant="danger">
                      {error}
                    </Alert>
                  )}

                  {success && (
                    <Alert variant="success">
                      {success}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Row 2 */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Mobile Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="mobile"
                            placeholder="Enter mobile number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>


                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="DOB"
                            value={formData.DOB}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Address */}
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    {/* Password Row */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Create Password</Form.Label>

                          <InputGroup>
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Create password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />

                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                setShowPassword(!showPassword)
                              }
                            >
                              {showPassword ? (
                                <EyeSlash />
                              ) : (
                                <Eye />
                              )}
                            </Button>
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm Password</Form.Label>

                          <InputGroup>
                            <Form.Control
                              type={
                                showConfirmPassword
                                  ? "text"
                                  : "password"
                              }
                              name="confirmPassword"
                              placeholder="Confirm password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />

                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                setShowConfirmPassword(
                                  !showConfirmPassword
                                )
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeSlash />
                              ) : (
                                <Eye />
                              )}
                            </Button>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      className="w-100 mt-3 rounded-pill"
                      style={{
                        backgroundColor: "#2a7035",
                        border: "none",
                        padding: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Create Account
                    </Button>

                    <p className="text-center mt-4 mb-0">
                      Already have an account?{" "}
                      <span
                        style={{
                          color: "#2a7035",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </span>
                    </p>
                  </Form>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;