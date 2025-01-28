import { AuthProvider, fetchUtils } from "react-admin";

import { jwtDecode } from "jwt-decode";

const apiUrl = "http://localhost:3030";
const httpClient = fetchUtils.fetchJson;

const authProvider: AuthProvider = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const requestPayload = { email, password };

    try {
      const { json } = await httpClient(`${apiUrl}/credentials/login`, {
        method: "POST",
        body: JSON.stringify(requestPayload),
      });

      localStorage.setItem("token", json); // Assuming json.token contains the JWT token

      // Decode the token to check the role
      const decoded = jwtDecode(json) as {
        id: number;
        email: string;
        role: string;
        isActivated: boolean;
      };

      const role = decoded.role;

      // Check if the role is 'admin', if not logout immediately
      if (role !== "admin") {
        localStorage.removeItem("token");
        throw new Error("You do not have the necessary permissions.");
      }
    } catch (error) {
      throw new Error("Invalid credentials or unauthorized role.");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return Promise.reject(new Error("No token found"));
    }
    try {
      const decoded = jwtDecode(token) as { role: string };
      if (decoded.role !== "admin") {
        localStorage.removeItem("token");
        return Promise.reject(
          new Error("You do not have the necessary permissions."),
        );
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("Invalid token"));
    }
  },

  checkError: (error) => {
    if (error.status === 401) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const token = localStorage.getItem("token");

    if (!token) return Promise.resolve();

    const decoded = jwtDecode(token) as {
      id: number;
      email: string;
      role: string;
      isActivated: boolean;
    };

    const role = decoded.role;

    if (!role.includes("admin"))
      return Promise.reject(new Error("No admin role found"));

    return Promise.resolve("admin");

    //
    // const decodedToken = jwt_decode(token);
    // const roles = decodedToken.roles || [];
    //
    // // Проверка на роль администратора
    // if (roles.includes("admin")) {
    //   return Promise.resolve("admin");
    // } else {
    //   return Promise.resolve("user");
    // }
  },
};

export default authProvider;
