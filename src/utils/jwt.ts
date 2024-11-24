import {jwtDecode} from "jwt-decode";

// Define the expected structure of your JWT payload
type JWTPayload = {
  id: string; // User ID
  role: "CLIENT" | "CREATOR"; // Role of the user
  exp: number; // Expiration timestamp
};

// Helper function to decode the JWT
export const getRoleFromToken = (): "CLIENT" | "CREATOR" | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: JWTPayload = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (!exp) return true;

    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return exp < now;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Treat invalid token as expired
  }
};

export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: JWTPayload = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};