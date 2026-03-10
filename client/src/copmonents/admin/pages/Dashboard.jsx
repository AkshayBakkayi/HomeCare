import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <h2>Admin Dashboard</h2>

      <Row className="mt-4">
        <Col md={4}>
          <Card className="p-3 shadow">
            <h5>Total Services</h5>
            <h3>--</h3>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow">
            <h5>Total Appointments</h5>
            <h3>--</h3>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow">
            <h5>Total Team Members</h5>
            <h3>--</h3>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;