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
    photo: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  // FETCH TEAM MEMBERS
  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/team");
      setTeams(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setTeamData({ ...teamData, photo: files[0] });
    } else {
      setTeamData({ ...teamData, [name]: value });
    }
  };

  // ADD OR UPDATE TEAM MEMBER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      Object.entries(teamData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (isEditMode) {
        await axios.put(
          `http://localhost:8000/api/admin/team/${teamId}`,
          formData
        );
      } else {
        await axios.post(
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
        photo: null,
      });

      setIsEditMode(false);
      setTeamId(null);

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // EDIT TEAM MEMBER
  const handleEdit = (team) => {
    setTeamData({
      name: team.name,
      role: team.role,
      experience: team.experience,
      description: team.description,
      photo: null,
    });

    setTeamId(team._id);
    setIsEditMode(true);
  };

  // DELETE TEAM MEMBER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/admin/team/${id}`);
      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">

      <h2 className="mb-4">
        {isEditMode ? "Edit Team Member" : "Add Team Member"}
      </h2>

      <Form onSubmit={handleSubmit}>

        <Row className="mb-3">

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

        <Row className="mb-3">

          <Col md={6}>
            <Form.Group>
              <Form.Label>Experience (Years)</Form.Label>
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
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
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
          {isEditMode ? "Update Member" : "Add Member"}
        </Button>

      </Form>

      <h3 className="mt-5">Team Members</h3>

      <Table striped bordered hover>

        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Photo</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>

          {teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team._id}>

                <td>{team.name}</td>
                <td>{team.role}</td>
                <td>{team.experience} yrs</td>

                <td>
                  {team.photo && (
                    <img
                      src={`http://localhost:8000/uploads/${team.photo}`}
                      width="50"
                      alt={team.name}
                    />
                  )}
                </td>

                <td>

                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(team)}
                  >
                    <MdEdit />
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(team._id)}
                  >
                    <MdDelete />
                  </Button>

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No team members found
              </td>
            </tr>
          )}

        </tbody>

      </Table>

    </Container>
  );
};

export default Team;