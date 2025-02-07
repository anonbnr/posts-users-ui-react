import { Card, CardHeader, CircularProgress, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import UserListItem from "../UserListItem/UserListItem";
import "./UserList.css";

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await UserService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Card className="user-container">
            <CardHeader title="👥 Users List" className="user-list-title" />
            <Divider />
            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
            ) : (
                <div className="user-list">
                    {users.length > 0 ? users.map((user) => (
                        <UserListItem key={user.id} user={user} />
                    )) : <p>No users found.</p>}
                </div>
            )}
        </Card>
    );
};

export default UserList;
