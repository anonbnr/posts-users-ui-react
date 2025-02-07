import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import TitleIcon from "@mui/icons-material/Title";
import { Button, Card, CardContent, CardHeader, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/PostService";
import "./NewPost.css";

interface NewPostForm {
    title: string;
    content: string;
}

const NewPost: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<NewPostForm>();
    const navigate = useNavigate();

    const onSubmit = async (data: NewPostForm) => {
        try {
            await PostService.addPost({ ...data, authorId: "guest" });
            navigate("/posts"); // Redirect to posts list after adding
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <Card className="new-post-container">
            <CardHeader title={<Typography className="new-post-title">📝 Create a New Post</Typography>} />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Post Title */}
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Post Title"
                                variant="outlined"
                                fullWidth
                                className="full-width title-field"
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <TitleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                    {/* Post Content */}
                    <Controller
                        name="content"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Content is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Post Content"
                                variant="outlined"
                                fullWidth
                                className="full-width"
                                multiline
                                rows={4}
                                error={!!errors.content}
                                helperText={errors.content?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EditIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                    {/* Submit Button */}
                    <div className="button-container">
                        <Button variant="contained" color="primary" type="submit" endIcon={<SendIcon />}>
                            Publish Post
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewPost;
