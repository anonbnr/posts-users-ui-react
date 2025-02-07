import axios from "axios";
import { User } from "../models/User";

const API_URL = "http://localhost:5000/api/users";

class UserService {
    async getUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(API_URL);
        return response.data;
    }

    async addUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
        const response = await axios.post<User>(API_URL, userData);
        return response.data;
    }

    async getUserById(id: string): Promise<User> {
        const response = await axios.get<User>(`${API_URL}/${id}`);
        return response.data;
    }

    async searchUsersByEmail(email: string): Promise<User[]> {
        try {
            const response = await axios.get<User[]>(`${API_URL}/search?email=${email}`);
            return response.data;
        } catch (error) {
            console.error("Search error:", error);
            return [];
        }
    }
}

export default new UserService();
