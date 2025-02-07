import CakeIcon from "@mui/icons-material/Cake";
import CalculateIcon from "@mui/icons-material/Calculate";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PaletteIcon from "@mui/icons-material/Palette";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Slider,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import "./NewUser.css";

const NewUser: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Omit<User, "id" | "createdAt">>({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
        birthday: new Date(), // Default to today
        telephone: "",
        country: "",
        bio: "",
        favoriteNumber: "",
        favoriteColor: "#000000",
        avatarImagePath: "",
        agreementLevel: "50",
        getsNewsletter: false,
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageBase64 = reader.result as string;
                setAvatarPreview(imageBase64);
                setFormData(prev => ({ ...prev, avatarImagePath: imageBase64 })); // Store it in formData
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const newUser = await UserService.addUser({
                ...formData,
                avatarImagePath: avatarPreview || formData.avatarImagePath || "", // Ensure it gets sent
            });
            navigate(`/users/${newUser.id}`);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <Card className="user-form-card">
            <CardHeader title="👤 Add a New User" className="form-title" />
            <Divider />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <TextField
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        className="full-width"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Last Name */}
                    <TextField
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        className="full-width"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Gender */}
                    <Typography className="gender-label">Gender</Typography>
                    <RadioGroup row name="gender" value={formData.gender} onChange={handleChange} className="gender-group">
                        <FormControlLabel value="M" control={<Radio />} label="Male" />
                        <FormControlLabel value="F" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>

                    {/* Email */}
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        className="full-width"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Password */}
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        className="full-width"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Birthday */}
                    <TextField
                        name="birthday"
                        label="Birthday"
                        type="date"
                        variant="outlined"
                        className="full-width"
                        value={formData.birthday ? new Date(formData.birthday).toISOString().split("T")[0] : ""}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CakeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Telephone */}
                    <TextField
                        name="telephone"
                        label="Telephone"
                        type="tel"
                        variant="outlined"
                        className="full-width"
                        value={formData.telephone}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Country */}
                    <Select
                        name="country"
                        value={formData.country || ""}
                        onChange={(event) => handleChange(event as SelectChangeEvent<string>)}
                        className="full-width"
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select a country</MenuItem>
                        {["France", "USA", "Germany", "Canada", "Japan", "Lebanon", "Algeria"].map(country => (
                            <MenuItem key={country} value={country}>{country}</MenuItem>
                        ))}
                    </Select>

                    {/* Bio */}
                    <TextField
                        name="bio"
                        label="Bio"
                        variant="outlined"
                        className="full-width"
                        multiline
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EditIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Favorite Number */}
                    <TextField
                        name="favoriteNumber"
                        label="Favorite Number"
                        type="number"
                        variant="outlined"
                        className="full-width"
                        value={formData.favoriteNumber}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalculateIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Favorite Color */}
                    <TextField
                        name="favoriteColor"
                        label="Favorite Color"
                        type="color"
                        variant="outlined"
                        className="full-width"
                        value={formData.favoriteColor}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PaletteIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Agreement Level */}
                    <Typography className="agreement-title">🤖 Do you think the machine will swallow us all one day?</Typography>
                    <Slider
                        name="agreementLevel"
                        value={Number(formData.agreementLevel)}
                        onChange={(event, value) => setFormData(prev => ({ ...prev, agreementLevel: value.toString() }))}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                    />
                    <Typography className="agreement-value">{formData.agreementLevel}%</Typography>

                    {/* Avatar Upload */}
                    <input type="file" onChange={handleAvatarChange} />
                    {avatarPreview && (
                        <div className="avatar-preview">
                            <img src={avatarPreview} alt="Avatar Preview" />
                        </div>
                    )}

                    {/* Newsletter */}
                    <FormControlLabel
                        control={<Checkbox checked={formData.getsNewsletter} onChange={() => setFormData(prev => ({ ...prev, getsNewsletter: !prev.getsNewsletter }))} />}
                        label="📩 Subscribe to Newsletter"
                    />

                    {/* Submit */}
                    <Button type="submit" variant="contained" color="primary" className="full-width">
                        Create User
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewUser;
