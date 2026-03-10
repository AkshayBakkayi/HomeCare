import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Table,
  Button,
  Container,
} from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const Team = () => {
  const [teams, setTeams] = useState([]);

  const [teamData, setTeamData] = useState({
    name: "",
    role: "",
    experience: "",
    description: "",
    image: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const res = await axios.get("http://localhost:8000/api/admin/team");
    setTeams(res.data.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setTeamData({ ...teamData, image: files[0] });
    } else {
      setTeamData({ ...teamData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(teamData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    let res;

    if (isEditMode) {
      res = await axios.put(
        `http://localhost:8000/api/admin/team/${teamId}`,
        formData
      );
    } else {
      res = await axios.post(
        "http://localhost:8000/api/admin/team",
        formData
      );
    }

    fetchTeams();

    setTeamData({
      name: "",
      role: "",
      experience: "",
      description: "",
      image: null,
    });

    setIsEditMode(false);
  };

  const handleEdit = (team) => {
    setTeamData({
      name: team.name,
      role: team.role,
      experience: team.experience,
      description: team.description,
      image: null,
    });

    setTeamId(team._id);
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;

    await axios.delete(`http://localhost:8000/api/admin/team/${id}`);
    fetchTeams();
  };

  return (
    <Container className="mt-5">

      <h2>{isEditMode ? "Edit Team Member" : "Add Team Member"}</h2>

      <Form onSubmit={handleSubmit}>

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={teamData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                name="role"
                value={teamData.role}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={teamData.experience}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
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
            value={teamData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="mt-3" type="submit">
          {isEditMode ? "Update" : "Add"}
        </Button>

      </Form>

      <h3 className="mt-5">Team List</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.role}</td>
              <td>{team.experience} yrs</td>

              <td>
                <img
                  src={`http://localhost:8000/uploads/${team.image}`}
                  width="50"
                  alt=""
                />
              </td>

              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(team)}
                >
                  <MdEdit />
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(team._id)}
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

export default Team;