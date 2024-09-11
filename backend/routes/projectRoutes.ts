import express from "express";
import { pool } from "../db/projectdb";
import { authenticateToken } from "../middleware/authorization";

const projectRouter = express.Router();

projectRouter.post("/",authenticateToken, (request, response, next) => {
  const {
    userId,
    projectName,
    clientName,
    projectType,
    description,
    reportingManager,
    status,
  } = request.body;

  const query = `INSERT INTO projects("userId", "projectName", "clientName", "projectType", "description", "reportingManager", "status")
       VALUES ($1, $2, $3, $4, $5, $6, $7 )
       RETURNING *`;

  pool.query(
    query,
    [
      userId,
      projectName,
      clientName,
      projectType,
      description,
      reportingManager,
      status,
    ],
    (err, res) => {
      if (err) {
        console.error("executing query", err.stack);
        return next(err);
      }
      if (res.rows.length === 0) {
        return response
          .status(404)
          .json({ message: "No projects found for this user's " });
      }

      response.status(200).json(res.rows);
    }
  );
});

projectRouter.delete("/:id",authenticateToken, (request, response, next) => {
  const { id } = request.params;
  const query = `DELETE FROM projects WHERE id=$1 RETURNING *`;

  pool.query(query, [id], (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return next(err);
    }

    // Check if a task was deleted
    if (res.rowCount === 0) {
      return response
        .status(404)
        .json({ message: "Project not found or already deleted." });
    }

    response.status(200).json({ message: "Project successfully deleted." });
  });
});

projectRouter.put("/:id", (request, response, next)=>{
    const {
        id,
        projectName,
        clientName,
        description,
        reportingManager,
        projectType,
        status
      } = request.body;

      const query = `
      UPDATE projects
      SET
      "projectName" = COALESCE($1, "projectName"),
      "clientName" = COALESCE($2, "clientName"),
      "description" = COALESCE($3, "description"),
      "reportingManager" = COALESCE($4, "reportingManager"),
      "projectType" = COALESCE($5, "projectType"),
      "status" = COALESCE($6, "status")
      WHERE
        "id" = $7
      RETURNING *;
      `;

      pool.query(query, [projectName,clientName,description,reportingManager,projectType,status, id], (err, res)=>{
        if(err){
            console.error("Error executing query", err.stack);
            return next(err);
          }
    
          if(res.rowCount === 0){
            return response.status(404).json({message: "Project not found." })
          }
    
          response.status(200).json(res.rows[0]);
      })
    
})

export default projectRouter;
