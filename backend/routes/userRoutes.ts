import express from "express";
import { pool } from "../db/projectdb";
import bcrypt from 'bcrypt';
import { authenticateToken } from "../middleware/authorization";

const userRouter = express.Router();

userRouter.get("/", (request, response, next) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

// userRouter.post('/',async(request, response, next)=>{

//   const {name, emailId, profileImage, role, password} = request.body
//   const hashedPassword = await bcrypt.hash(password, 10);


// })

userRouter.get("/:userId/projects",authenticateToken, (request, response, next) => {
  const { userId } = request.params;
  const query = `SELECT
            p."id",
            p."projectName",
         p."clientName",
            p."description", 
            p."reportingManager", 
            p."status", 
            p."projectType",
            p."userId"
FROM
projects p
WHERE
 p."userId" = $1;
    `;

  pool.query(query, [userId], (err, res) => {
    if (err) return next(err);
    if (res.rows.length === 0) {
      return response
        .status(404)
        .json({ message: "No projects found for this user." });
    }
    response.status(200).json(res.rows);
  });
});

userRouter.get("/:userId/tasks",authenticateToken, (request, response, next) => {
  const { userId } = request.params;
  const { projectId }: any = request.query;

  let query = `
    SELECT
      t."id" ,
      t."name",
      t."category",
      t."description" ,
      t."billingType",
      t."status" ,
      t."userId",
      p.id AS "projectId"
    FROM
      tasks t
    INNER JOIN
      projects p ON t."projectId" = p.id
    WHERE
      p."userId" = $1
  `;

  const queryParams = [userId];

  // If projectId is provided, add it to the query and parameters
  if (projectId) {
    query += ` AND p.id = $2`;
    queryParams.push(projectId);
  }

  pool.query(query, queryParams, (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return next(err);
    }

    if (res.rows.length === 0) {
      return response
        .status(404)
        .json({ message: "No tasks found for this user's projects." });
    }

    response.status(200).json(res.rows);
  });
});

export default userRouter;
