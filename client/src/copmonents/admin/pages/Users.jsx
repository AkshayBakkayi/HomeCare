import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

const AdminUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8000/api/admin/users"
      );

      setUsers(res.data.data);

    } catch (error) {
      console.log(error);
    }

  };


  return (

    <Container className="mt-5">

      <h2 className="mb-4">
        Registered Users
      </h2>

      <Table bordered hover responsive>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Verified</th>
            <th>Registered Date</th>
          </tr>
        </thead>

        <tbody>

          {users.length > 0 ? (

            users.map(user => (

              <tr key={user._id}>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>

                <td>
                  {new Date(user.DOB)
                    .toLocaleDateString()}
                </td>

                <td>{user.address}</td>

                <td>
                  {user.isVerified ? "Yes" : "No"}
                </td>

                <td>
                  {new Date(user.createdAt)
                    .toLocaleDateString()}
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="7" className="text-center">
                No users found
              </td>
            </tr>

          )}

        </tbody>

      </Table>

    </Container>

  );

};

export default AdminUsers;