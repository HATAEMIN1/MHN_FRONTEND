import React, { useState, useEffect } from "react";
import axios from "axios";

function Test2() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/users", newUser);
            setNewUser({ name: "", email: "" });
            fetchUsers(); // 목록 새로고침
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div>
            <h1>User Management</h1>

            <form onSubmit={addUser}>
                <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <button type="submit">Add User</button>
            </form>

            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Test2;
