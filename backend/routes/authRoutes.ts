import express from "express";
import { pool } from "../db/projectdb";
import bcrypt from "bcrypt";
// import { jwtTokens } from "./../utils/jwt.helpers";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt.helpers";
import { authenticateToken } from "../middleware/authorization";

const authRouter = express.Router();

authRouter.post("/", async (request, response, next) => {
  try {
    const { email, password } = request.body;

    // Fetch the user by email
    const userResult = await pool.query(
      'SELECT * FROM users WHERE "emailId" = $1',
      [email]
    );

    // Check if the user exists
    if (userResult.rows.length === 0) {
      return response.status(401).json({ error: "Email is incorrect" });
    }

    const user: any = userResult.rows[0];

    // Check if the password matches
    if (user.password !== password) {
      return response.status(401).json({ error: "Password is incorrect" });
    }

    // Generate JWT tokens
    let tokens = jwtTokens(user);

    // Set the refresh token as an HTTP-only cookie
    // response.cookie("refresh_token", tokens.refreshToken, {
    //   httpOnly: true,
    //   secure: false, // Set this to true in production (HTTPS)
    //   sameSite:"none",
    // });

    // console.log(response.cookie);

    // Send the tokens as the response
    return response.json(tokens);
  } catch (err: any) {
    console.error("Error during login process", err.stack);
    next(err); // Pass the error to the next middleware
  }
});

authRouter.get("/refresh-token", (request, response) => {
  try {
    // const refreshToken = request.cookies.refresh_token;
    const authHeader = request.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    console.log("Received refresh token:", refreshToken);

    if (!refreshToken) {
      return response.status(401).json({ error: "Refresh token not found" });
    }
console.log("refsh",process.env.REFRESH_TOKEN_SECRET)
    jwt.verify(
      refreshToken,
      '4369c5db1b27100c7079915946f973030ea5148ba85d6c55c6a50f562b7fec80',
      (error: any, user: any) => {
        if (error) {
          console.error("JWT verification error:", error); // Log the exact error
          return response.status(403).json({ error: "Invalid refresh token" });
        }

        // Generate new JWT tokens
        const tokens = jwtTokens(user);

        // Set the refresh token as an HTTP-only cookie
        // response.cookie("refresh_token", tokens.refreshToken, {
        //   httpOnly: true,
        //   secure: false, // Set this to true in production (HTTPS)
        //   sameSite: "lax",
        //   path: "/", // Use 'none' if cross-site cookie usage is needed
        // });

        // Send new access token
        response.json(tokens);
      }
    );
  } catch (error: any) {
    console.error("Server error:", error.message);
    response.status(500).json({ error: error.message });
  }
});

authRouter.delete("/refresh-token", (request, response, next) => {
  try {
    response.clearCookie("refresh_token");
    return response.status(200).json({ message: "Refresh token deleted" });
  } catch (error) {
    response.status(401).json({ message: "Refresh token deleted" });
  }
});

export default authRouter;
