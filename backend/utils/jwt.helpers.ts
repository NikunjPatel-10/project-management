import jwt from 'jsonwebtoken';

// Generate an access token and a refresh token for this database user
function jwtTokens({ id, emailId,name,profileImage,role,password  }: any) {
  const user = { id, emailId,name,profileImage,role,password };
  
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '10s' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '5m' });
  
  return { accessToken, refreshToken };
}

export { jwtTokens };

