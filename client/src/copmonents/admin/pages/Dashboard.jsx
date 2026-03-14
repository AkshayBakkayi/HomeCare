import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container } from "react-bootstrap";
import {
  FaStethoscope,
  FaCalendarCheck,
  FaUserMd,
  FaUsers
} from "react-icons/fa";

const Dashboard = () => {

  const [stats, setStats] = useState({
    services: 0,
    appointments: 0,
    teams: 0,
    users: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);


  const fetchStats = async () => {

    try {

      const services = await axios.get(
        "http://localhost:8000/api/admin/service"
      );

      const appointments = await axios.get(
        "http://localhost:8000/api/admin/appointment"
      );

      const teams = await axios.get(
        "http://localhost:8000/api/admin/team"
      );

      const users = await axios.get(
        "http://localhost:8000/api/admin/users"
      );

      setStats({
        services: services.data.data.length,
        appointments: appointments.data.data.length,
        teams: teams.data.data.length,
        users: users.data.data.length
      });

    } catch (error) {
      console.log(error);
    }

  };


  return (

    <Container>

      <h2 className="mb-4">Admin Dashboard</h2>

      <Row>

        {/* SERVICES */}

        <Col md={3} className="mb-4">

          <Card className="p-4 shadow border-0 text-center">

            <FaStethoscope size={35} className="mb-2 text-primary" />

            <h5>Total Services</h5>

            <h2>{stats.services}</h2>

          </Card>

        </Col>


        {/* APPOINTMENTS */}

        <Col md={3} className="mb-4">

          <Card className="p-4 shadow border-0 text-center">

            <FaCalendarCheck size={35} className="mb-2 text-success" />

            <h5>Total Appointments</h5>

            <h2>{stats.appointments}</h2>

          </Card>

        </Col>


        {/* TEAM */}

        <Col md={3} className="mb-4">

          <Card className="p-4 shadow border-0 text-center">

            <FaUserMd size={35} className="mb-2 text-warning" />

            <h5>Total Team Members</h5>

            <h2>{stats.teams}</h2>

          </Card>

        </Col>


        {/* USERS */}

        <Col md={3} className="mb-4">

          <Card className="p-4 shadow border-0 text-center">

            <FaUsers size={35} className="mb-2 text-danger" />

            <h5>Total Users</h5>

            <h2>{stats.users}</h2>

          </Card>

        </Col>

      </Row>

    </Container>

  );

};

export default Dashboard;