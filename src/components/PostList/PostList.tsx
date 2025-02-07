import { Card, CardHeader, CircularProgress, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Post } from "../../models/Post";
import PostService from "../../services/PostService";
import PostListItem from "../PostListItem/PostListItem";

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await PostService.getPosts();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Card sx={{ width: "90%", maxWidth: "1200px", margin: "20px auto", padding: "30px", borderRadius: "12px" }}>
            <CardHeader title="📝 Latest Posts" sx={{ textAlign: "center", color: "#3f51b5", fontSize: "28px", fontWeight: "bold" }} />
            <Divider />
            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
            ) : (
                <div className="post-list">
                    {posts.length > 0 ? posts.map((post) => <PostListItem key={post.id} post={post} onPostUpdated={fetchPosts} />) : <p>No posts found.</p>}
                </div>
            )}
        </Card>
    );
};

export default PostList;
