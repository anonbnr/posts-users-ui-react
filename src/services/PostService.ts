import axios from "axios";
import { Post } from "../models/Post";

const API_URL = "http://localhost:5000/api/posts";

class PostService {
    async getPosts(): Promise<Post[]> {
        const response = await axios.get<Post[]>(API_URL);
        return response.data;
    }

    async addPost(postData: { title: string; content: string; authorId: string }): Promise<Post> {
        const response = await axios.post<Post>(API_URL, postData);
        return response.data;
    }

    async deletePost(id: string): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }

    async likePost(id: string): Promise<Post> {
        const response = await axios.post<Post>(`${API_URL}/${id}/like`);
        return response.data;
    }

    async dislikePost(id: string): Promise<Post> {
        const response = await axios.post<Post>(`${API_URL}/${id}/dislike`);
        return response.data;
    }
}

export default new PostService();
