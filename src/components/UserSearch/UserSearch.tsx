import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Card, CardContent, CardHeader, CircularProgress, Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { User } from "../../models/User";
import UserService from "../../services/UserService";
import UserListItem from "../UserListItem/UserListItem";
import "./UserSearch.css";

const UserSearch: React.FC = () => {
    const [searchEntry, setSearchEntry] = useState<string>("");
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    // Handles search input changes with debounce
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchEntry(value);

        if (debounceTimeout) clearTimeout(debounceTimeout); // Clear previous debounce timer

        // Set a new debounce timeout (300ms delay)
        const newTimeout = setTimeout(() => {
            if (value.trim() !== "") {
                setLoading(true);
                UserService.searchUsersByEmail(value.trim())
                    .then(users => setSearchedUsers(users))
                    .catch(error => console.error("Error fetching users:", error))
                    .finally(() => setLoading(false));
            } else {
                setSearchedUsers([]);
            }
        }, 300);

        setDebounceTimeout(newTimeout);
    };

    // Clear search input and results
    const clearSearch = () => {
        setSearchEntry("");
        setSearchedUsers([]);
    };

    return (
        <Card className="search-card">
            <CardHeader title="🔍 Search Users" className="search-title" />
            <Divider />
            <CardContent>
                <form className="search-form">
                    <TextField
                        name="userSearch"
                        label="Search for Users by Email"
                        type="search"
                        variant="outlined"
                        className="full-width"
                        value={searchEntry}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: searchEntry ? (
                                <IconButton onClick={clearSearch}>
                                    <ClearIcon />
                                </IconButton>
                            ) : null,
                        }}
                    />
                </form>

                {loading ? (
                    <CircularProgress className="loading-spinner" />
                ) : (
                    <>
                        {searchedUsers.length > 0 ? (
                            <div className="results-container">
                                <h3>Results</h3>
                                <div className="user-results">
                                    {searchedUsers.map(user => (
                                        <UserListItem key={user.id} user={user} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            searchEntry.trim() !== "" && (
                                <p className="no-results">
                                    ❌ No users found matching "<strong>{searchEntry}</strong>"
                                </p>
                            )
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default UserSearch;
