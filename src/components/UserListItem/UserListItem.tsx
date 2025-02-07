import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import "./UserListItem.css";

interface UserListItemProps {
    user: User;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (user.id) {
            navigate(`/users/${user.id}`);
        } else {
            console.error("User ID is missing, cannot navigate!");
        }
    };

    return (
        <Card className="user-preview-card" onClick={handleNavigation}>
            <CardContent className="user-preview-header">
                <img src={user.avatarImagePath} alt="User Avatar" className="user-avatar" />
                <div className="user-preview-details">
                    <Typography className='user-name' fontSize={"18px"} fontWeight={"bold"}>{user.firstName} {user.lastName}</Typography>
                    <Typography className="user-country" fontSize={"14px"}>🌍 {user.country}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserListItem;
