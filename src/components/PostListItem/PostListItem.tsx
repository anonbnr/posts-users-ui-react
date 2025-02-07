import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { Post } from "../../models/Post";
import PostService from "../../services/PostService";

interface PostListItemProps {
    post: Post;
    onPostUpdated: () => void; // Callback function to refresh posts after updates
}

const PostListItem: React.FC<PostListItemProps> = ({ post, onPostUpdated }) => {
    const handleLike = async () => {
        await PostService.likePost(post.id);
        onPostUpdated(); // Refresh posts after liking
    };

    const handleDislike = async () => {
        await PostService.dislikePost(post.id);
        onPostUpdated(); // Refresh posts after disliking
    };

    const handleDelete = async () => {
        await PostService.deletePost(post.id);
        onPostUpdated(); // Refresh posts after deletion
    };

    return (
        <Card elevation={3}
            sx={{
                borderLeft: post.loveIts > 0 ? "6px solid #4caf50" : post.loveIts < 0 ? "6px solid #f44336" : "none",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                },
            }}
        >
            <CardHeader
                avatar={<ArticleIcon className="post-icon" />}
                title={<Typography className="post-title">{post.title}</Typography>}
                subheader={<Typography className="post-date">🕒 {new Date(post.createdAt).toLocaleString()}</Typography>}
            />
            <CardContent>
                <Typography variant="body2" className="post-content">
                    {post.content}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions className="action-buttons">
                <IconButton color="primary" onClick={handleLike} title="Like" type="button">
                    <ThumbUpIcon />
                </IconButton>
                <IconButton color="error" onClick={handleDislike} title="Dislike" type="button">
                    <ThumbDownIcon />
                </IconButton>
                <IconButton color="secondary" onClick={handleDelete} title="Delete" type="button">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PostListItem;
