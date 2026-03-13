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


const UserServices = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchServices();
  }, []);


  const fetchServices = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/admin/service"
      );

      setServices(res.data.data);

    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h4>Loading services...</h4>
      </Container>
    );
  }


  return (
    <>
      <style>{`
        .service-card{
          border:none;
          border-radius:12px;
          padding:25px;
          transition:0.3s;
          box-shadow:0 4px 15px rgba(0,0,0,0.08);
        }

        .service-card:hover{
          transform:translateY(-6px);
          box-shadow:0 10px 25px rgba(0,0,0,0.15);
        }

        .service-icon{
          font-size:42px;
          color:#0d6efd;
          margin-bottom:15px;
        }

        .service-list{
          list-style:none;
          padding:0;
          margin-top:10px;
        }

        .service-list li{
          margin-bottom:6px;
          color:#555;
        }

        .service-title{
          font-weight:600;
          margin-bottom:10px;
        }
      `}</style>

      <Container className="mt-5">

        <h2 className="text-center mb-4">Our Services</h2>

        <Row>

          {services.length > 0 ? (

            services.map(service => {

              const Icon = iconMap[service.icon];

              return (

                <Col md={4} key={service._id} className="mb-4">

                  <Card className="service-card text-center">

                    {Icon && <Icon className="service-icon" />}

                    <h5 className="service-title">
                      {service.serviceName}
                    </h5>

                    <ul className="service-list">

                      {(service.description || []).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}

                    </ul>

                  </Card>

                </Col>

              );

            })

          ) : (

            <Col>
              <p className="text-center">
                No services available
              </p>
            </Col>

          )}

        </Row>

      </Container>
    </>
  );
};

export default UserServices;