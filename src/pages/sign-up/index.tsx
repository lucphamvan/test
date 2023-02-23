import TextFieldError from "@/components/text-field-error";
import { useAppContext } from "@/hook/useAppContext";
import { checUserExisted, signUp } from "@/services/authen.service";
import { NotifyType } from "@/types/general";
import { CreateUserInput } from "@/types/user";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardContent, Container as MuiContainer, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
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
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required")
            .test("is-existed", "This email was use by another", async (value) => {
                try {
                    const isUsed = await checUserExisted(value || "");
                    return !isUsed;
                } catch (error) {
                    return false;
                }
            }),
        password: yup.string().min(5, "Password require at least 5 character").required("Password is required"),
        password_confirm: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref("password"), null], "Confirm password is not match"),
        name: yup.string().required("Name is required")
    })
    .required();

const SignupDialog = () => {
    const { notify } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (value: any) => {
        // console.log(value);
        try {
            const data: CreateUserInput = {
                name: value.name,
                email: value.email,
                password: value.password,
                avatar: value.avatar
            };
            await signUp(data);
            notify("Create user successfull", NotifyType.success);
        } catch (error: any) {
            console.log("Failed to create user", error.message);
            notify("Failed to create user. Re-check or try again later", NotifyType.error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" fontWeight={600} className="title-font">
                Create your account
            </Typography>
            <Card className="shadow-box">
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack paddingY="0.25rem" spacing="1.5rem">
                            <div>
                                <TextField size="small" fullWidth label="Email *" {...register("email")} />
                                <TextFieldError errors={errors} name="email" />
                            </div>
                            <div>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Password *"
                                    type="password"
                                    {...register("password")}
                                />
                                <TextFieldError errors={errors} name="password" />
                            </div>
                            <div>
                                <TextField
                                    size="small"
                                    fullWidth
                                    type="password"
                                    label="Confirm Password *"
                                    {...register("password_confirm")}
                                />
                                <TextFieldError errors={errors} name="password_confirm" />
                            </div>
                            <div>
                                <TextField size="small" fullWidth type="text" label="Name *" {...register("name")} />
                                <TextFieldError errors={errors} name="name" />
                            </div>
                            <Button size="large" variant="contained" type="submit" disabled={isSubmitting}>
                                Sign up
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default SignupDialog;
