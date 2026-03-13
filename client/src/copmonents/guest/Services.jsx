import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

import {
 FaUserNurse,
 FaHeartbeat,
 FaVials,
 FaHospitalUser,
 FaAmbulance
} from "react-icons/fa";


const iconMap = {
 FaUserNurse,
 FaHeartbeat,
 FaVials,
 FaHospitalUser,
 FaAmbulance
};


const GuestServices = () => {

  const [services, setServices] = useState([]);


  useEffect(() => {

    axios
      .get("http://localhost:8000/api/admin/service")
      .then(res => setServices(res.data.data));

  }, []);


  return (
    <Container className="mt-5">

      <Row>

        {services.map(service => {

          const Icon = iconMap[service.icon];

          return (

            <Col md={4} key={service._id} className="mb-4">

              <Card className="p-4 text-center">

                {Icon && <Icon size={40} className="mb-3 text-primary" />}

                <h5>{service.serviceName}</h5>

                <ul className="service-list">

                  {service.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}

                </ul>

              </Card>

            </Col>

          );

        })}

      </Row>

    </Container>

    
  );
 
};



export default GuestServices;