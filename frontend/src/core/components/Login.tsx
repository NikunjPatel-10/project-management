import {
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStyles } from "../utility/styles/login.stye";
import loginFormSchema from "../utility/validations/loginForm.vaidations";
import { jwtDecode } from "jwt-decode"; // Corrected import
import {
  useLoginUserMutation,
  useRefreshAuthTokenMutation,
} from "../utility/services/auth.services";

const Login = () => {
  const { classes } = loginStyles();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [refreshAuthToken] = useRefreshAuthTokenMutation();
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(loginFormSchema),
    validateInputOnBlur: true,
  });

  // const scheduleTokenRefresh = (expiresIn: number) => {
  //   const refreshTime = expiresIn - 10000; // Refresh 10 seconds before expiration
  //   setTimeout(async () => {
  //     try {
  //       console.log('Sending request with cookies:', document.cookie); // Check cookies being sent
  //       const response = await axios.get('http://localhost:3000/login/refresh-token', {
  //         withCredentials: true,
  //       });

  //       console.log('Response:', response.data);
  //       if (response) {
  //         const { accessToken } = response.data;

  //         // Store the new token and reschedule refresh
  //         localStorage.setItem("accessToken", accessToken);
  //         const decodedToken: any = jwtDecode(accessToken);
  //         scheduleTokenRefresh(decodedToken.exp * 1000 - Date.now());
  //       } else {
  //         handleSessionExpired();
  //       }
  //     } catch (error: any) {
  //       if (error.status === 403) {
  //         console.error("Forbidden: Refresh token request denied.", error);
  //         handleSessionExpired();
  //       } else {
  //         console.error("Token refresh error", error);
  //         setError("An error occurred during token refresh");
  //       }
  //     }
  //   }, refreshTime);
  // };

  // const handleSessionExpired = () => {
  //   setError("Session expired. Please log in again.");
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("userName");
  //   localStorage.removeItem("isAdmin");
  //   localStorage.removeItem("isAuthenticated");
  //   // navigate("/login");
  // };

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginUser({ userData: values }).unwrap();

      console.log(response);
      

      if (response) {
        console.log(response)
        const { accessToken, refreshToken} = response;

        // Store token in local storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Decode token to get user data
        const decodedToken: any = jwtDecode(accessToken);

        // Store user data in local storage
        localStorage.setItem("userName", decodedToken.name);
        localStorage.setItem(
          "isAdmin",
          JSON.stringify(decodedToken.role === "admin")
        );
        localStorage.setItem("isAuthenticated", "true");

        navigate(`/users/${decodedToken.id}/dashboard`);
      } else {
        setError("Invalid email or password");
      }
    } catch (error: any) {
      console.error("Login error", error);
      setError("An error occurred during login");
    }
  };

  return (
    <Group h={"100%"} className={classes.wrapper}>
      <Paper shadow="sm" p="xl" w={"450px"} m="auto">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Stack spacing={"xs"}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              withAsterisk
              {...form.getInputProps("password")}
            />
            {error && <Text color="red">{error}</Text>}
          </Stack>
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Paper>
    </Group>
  );
};

export default Login;
