import CakeIcon from "@mui/icons-material/Cake";
import CalculateIcon from "@mui/icons-material/Calculate";
import EmailIcon from "@mui/icons-material/Email";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PaletteIcon from "@mui/icons-material/Palette";
import PhoneIcon from "@mui/icons-material/Phone";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PublicIcon from "@mui/icons-material/Public";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (id) {
            UserService.getUserById(id)
                .then(setUser)
                .catch(error => console.error("Failed to fetch user:", error));
        }
    }, [id]);

    if (!user) {
        return <Typography className="not-found">User not found.</Typography>;
    }

    return (
        <Card className="profile-card">
            {/* Header Section */}
            <CardHeader
                className="profile-header"
                title={
                    <div className="profile-details">
                        <Typography variant="h5">
                            {user.firstName} {user.lastName} ({user.gender})
                        </Typography>
                        <Typography className="profile-date">
                            🕒 Joined: {new Date(user.createdAt).toLocaleDateString()}
                        </Typography>
                    </div>
                }
                action={user.avatarImagePath && (
                    <div className="profile-avatar">
                        <img src={user.avatarImagePath} alt="User Avatar" />
                    </div>
                )}
            />
            <Divider />

            {/* User Info Section */}
            <CardContent>
                <div className="info-section">
                    <div className="info-row">
                        <CakeIcon className="info-icon" />
                        <span>Birthday: <strong>{new Date(user.birthday).toLocaleDateString()}</strong></span>
                    </div>
                    <div className="info-row">
                        <EmailIcon className="info-icon" />
                        <span>Email: <strong>{user.email}</strong></span>
                    </div>
                    <div className="info-row">
                        <PublicIcon className="info-icon" />
                        <span>Country: <strong>{user.country}</strong></span>
                    </div>
                    <div className="info-row">
                        <PhoneIcon className="info-icon" />
                        <span>Telephone: <strong>{user.telephone}</strong></span>
                    </div>
                </div>

                {/* Bio Section */}
                {user.bio && (
                    <div className="bio-section">
                        <Divider />
                        <Typography className="bio-title">📝 Bio</Typography>
                        <Typography className="bio-content">
                            {expanded ? user.bio : `${user.bio.slice(0, 150)}${user.bio.length > 150 ? "..." : ""}`}
                        </Typography>
                        {user.bio.length > 150 && (
                            <button className="toggle-bio" onClick={() => setExpanded(!expanded)}>
                                {expanded ? "Read Less" : "Read More"}
                            </button>
                        )}
                    </div>
                )}

                <Divider />

                {/* Extra Info */}
                <div className="extra-info">
                    <div className="info-row">
                        <CalculateIcon className="info-icon" />
                        <span>Favorite Number: <strong>{user.favoriteNumber}</strong></span>
                    </div>

                    <div className="info-row">
                        <PaletteIcon className="info-icon" />
                        <span>Favorite Color:</span>
                        <span className="color-box" style={{ backgroundColor: user.favoriteColor }}></span>
                    </div>

                    <div className="info-row">
                        <PsychologyIcon className="info-icon" />
                        <span>Agreement Level: <strong>{user.agreementLevel}%</strong></span>
                    </div>

                    {user.getsNewsletter && (
                        <div className="info-row newsletter">
                            <MarkEmailReadIcon className="info-icon" />
                            <span>Subscribed to Newsletter</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default UserProfile;
