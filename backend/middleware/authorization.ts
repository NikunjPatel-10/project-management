
import jwt from "jsonwebtoken";

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]; // Correct the split here to use " " (space)
  
  if (token == null) return res.status(401).json({ error: "Null token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error: any, user: any) => {
    if (error) return res.status(401).json({ error: error.message });
    req.user = user;
    next();
  });
}

export { authenticateToken };
