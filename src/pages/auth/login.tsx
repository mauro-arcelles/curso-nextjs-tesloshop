import { testoApi } from "@/api";
import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string,
  password: string,
};

const LoginPage = () => {

  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  };

  return (
    <AuthLayout title="Ingresar">

      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Iniciar Sesión</Typography>
              {
                showError && (
                  <Chip
                    label="No reconocemos ese usuario / contraseña"
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                  />
                )
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                variant="filled"
                fullWidth
                type="password"
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    message: 'Debe tener al menos 6 caracteres',
                    value: 6,
                  }
                })
                }
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <Link component={NextLink} href={router.query.p ? `/auth/register?p=${router.query.p}` : `/auth/register`} passHref underline="always">
                ¿No tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>

    </AuthLayout>
  );
};

export default LoginPage;