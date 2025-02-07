import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import TodayIcon from "@mui/icons-material/Today";
import { Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import "./UserAvailability.css";

const UserAvailability: React.FC = () => {
    const [availability, setAvailability] = useState({
        dateTime: "",
        time: "",
        month: "",
        week: "",
    });

    const [availabilitySaved, setAvailabilitySaved] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAvailability(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setAvailabilitySaved(true);
    };

    return (
        <Card className="date-time-card">
            <CardHeader title="📅 Set Your Availability" className="date-time-title" />
            <Divider />
            <CardContent>
                <form onSubmit={handleSubmit} className="date-time-form">
                    {/* Date Picker */}
                    <TextField
                        name="dateTime"
                        label="Select Date"
                        type="date"
                        variant="outlined"
                        className="full-width"
                        value={availability.dateTime}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <TodayIcon />,
                        }}
                    />

                    {/* Time Picker */}
                    <TextField
                        name="time"
                        label="Time"
                        type="time"
                        variant="outlined"
                        className="full-width"
                        value={availability.time}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <AccessTimeIcon />,
                        }}
                    />

                    {/* Month Picker */}
                    <TextField
                        name="month"
                        label="Month"
                        type="month"
                        variant="outlined"
                        className="full-width"
                        value={availability.month}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <CalendarMonthIcon />,
                        }}
                    />

                    {/* Week Picker */}
                    <TextField
                        name="week"
                        label="Week"
                        type="week"
                        variant="outlined"
                        className="full-width"
                        value={availability.week}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <EventIcon />,
                        }}
                    />

                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="primary" className="full-width">
                        Save Availability
                    </Button>
                </form>

                <Divider />

                {/* Display Saved Availability */}
                {availabilitySaved && (
                    <div className="results-container">
                        <h3>✅ Your Availability</h3>
                        <ul>
                            {availability.dateTime && (
                                <li>📆 <strong>Date:</strong> {new Date(availability.dateTime).toLocaleDateString()}</li>
                            )}
                            {availability.time && (
                                <li>⏰ <strong>Time:</strong> {availability.time}</li>
                            )}
                            {availability.month && (
                                <li>📅 <strong>Month:</strong> {availability.month}</li>
                            )}
                            {availability.week && (
                                <li>📆 <strong>Week:</strong> {availability.week}</li>
                            )}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default UserAvailability;
