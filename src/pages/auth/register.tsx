import { testoApi } from "@/api";
import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';

type FormData = {
  name: string,
  email: string,
  password: string,
};

const RegisterPage = () => {

  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async (formData: FormData) => {
    setShowError(false);
    const { name, email, password } = formData;
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);

      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }

    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  };

  return (
    <AuthLayout title="Registrarse">

      <form onSubmit={handleSubmit(onRegisterForm)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Registrarse</Typography>
              {
                showError && (
                  <Chip
                    label={errorMessage}
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                  />
                )
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: { value: true, message: 'El nombre es requerido' },
                  minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                  maxLength: { value: 20, message: 'El nombre debe tener máximo 20 caracteres' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: { value: true, message: 'El correo es requerido' },
                  validate: validations.isEmail,
                })}
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
                  required: { value: true, message: 'La contraseña es requerida' },
                  minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color="secondary" className="circular-btn" size="large" fullWidth type="submit">Crear cuenta</Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <Link component={NextLink} href={router.query.p ? `/auth/login?p=${router.query.p}` : `/auth/login`} passHref underline="always">
                ¿Ya tienes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>

    </AuthLayout>
  );
};

export default RegisterPage;