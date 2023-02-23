import TextFieldError from "@/components/text-field-error";
import { ROUTE } from "@/config/route";
import { useAppContext } from "@/hook/useAppContext";
import { useAppDispatch } from "@/redux/hook";
import { fetchUserInfo } from "@/redux/slice/authen.slice";
import { login } from "@/services/authen.service";
import { NotifyType } from "@/types/general";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    Card,
    CardContent,
    Container as MuiContainer,
    Divider,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Container = styled(MuiContainer)`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    gap: 1rem;
`;

const schema = yup
    .object()
    .shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(5, "Password require at least 5 character").required("Password is required")
    })
    .required();

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const { notify } = useAppContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    // login
    const onSubmit = async (values: any) => {
        try {
            await login(values.email, values.password);
            await dispatch(fetchUserInfo()).unwrap();
            notify(`Welcome to Hola App`, NotifyType.success);
            navigate("/" + ROUTE.HOME);
        } catch (error: any) {
            console.log("failed to login", error.message);
            notify(`Failed to login : ${error.message}`, NotifyType.error);
        }
    };

    const goToSignupPage = () => {
        navigate("/" + ROUTE.SIGN_UP);
    };

    // render
    return (
        <Container maxWidth="xs">
            <Typography variant="h5" fontWeight={600} className="title-font">
                LOGIN
            </Typography>
            <Card className="shadow-box">
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack paddingY="0.25rem" spacing="1.5rem">
                            <div>
                                <TextField {...register("email")} size="small" label="Email *" fullWidth />
                                <TextFieldError errors={errors} name="email" />
                            </div>
                            <div>
                                <TextField
                                    {...register("password")}
                                    size="small"
                                    type="password"
                                    label="Password *"
                                    fullWidth
                                />
                                <TextFieldError errors={errors} name="password" />
                            </div>
                            <Button type="submit" variant="contained" disabled={isSubmitting}>
                                Login
                            </Button>
                            <Divider variant="middle" />
                            <Typography variant="inherit">
                                No account?{" "}
                                <Button
                                    style={{
                                        fontSize: 13,
                                        textTransform: "capitalize",
                                        borderRadius: 2,
                                        padding: "0.1rem 0.75rem"
                                    }}
                                    variant="outlined"
                                    onClick={goToSignupPage}
                                >
                                    Sign-up{" "}
                                </Button>
                            </Typography>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginPage;
