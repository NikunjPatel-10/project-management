import express, { response } from "express";
import { pool } from "../db/projectdb";
import { authenticateToken } from "../middleware/authorization";

const taskRouter = express.Router();

taskRouter.post("/",authenticateToken, (request, response, next) => {
  const {
    userId,
    projectId,
    name,
    category,
    description,
    billingType,
    status,
  } = request.body;

  const query = `INSERT INTO tasks("userId", "projectId", "name", "category", "description", "billingType", "status")
     VALUES ($1, $2, $3, $4, $5, $6, $7 )
     RETURNING *`;

  pool.query(
    query,
    [userId, projectId, name, category, description, billingType, status],
    (err, res) => {
      if (err) {
        console.error("executing query", err.stack);
        return next(err);
      }
      if (res.rows.length === 0) {
        return response
          .status(404)
          .json({ message: "No tasks found for this user's projects." });
      }

      response.status(200).json(res.rows);
    }
  );
});

taskRouter.delete("/:id",authenticateToken, (request, response, next) => {
  const { id } = request.params;

  const query = `DELETE FROM tasks WHERE id=$1 RETURNING *`;

  pool.query(query, [id], (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return next(err);
    }

    // Check if a task was deleted
    if (res.rowCount === 0) {
      return response
        .status(404)
        .json({ message: "Task not found or already deleted." });
    }

    response.status(200).json({ message: "Task successfully deleted." });
  });
});

taskRouter.put("/:id",authenticateToken, (request, response, next) => {
  const { id, name, category, description, billingType, status } = request.body;

  const query = `
    UPDATE tasks
    SET
    "name" = COALESCE($1, "name"),
    "category" = COALESCE($2, "category"),
    "description" = COALESCE($3, "description"),
    "billingType" = COALESCE($4, "billingType"),
    "status" = COALESCE($5, "status")
    WHERE
      "id" = $6
    RETURNING *;
    `;

    pool.query(query, [ name, category, description, billingType, status, id], (err, res)=>{
      if(err){
        console.error("Error executing query", err.stack);
        return next(err);
      }

      if(res.rowCount === 0){
        return response.status(404).json({message: "Task not found." })
      }

      response.status(200).json(res.rows[0]);

    })
});

export default taskRouter;
