import { AuthLayout } from "@/components/layouts";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from 'next/link';

const RegisterPage = () => {
  return (
    <AuthLayout title="Registrarse">

      <Box sx={{ width: 350, padding: '10px 20px' }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">Registrarse</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Nombre" variant="filled" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Correo" variant="filled" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Contraseña" variant="filled" fullWidth type="password" />
          </Grid>

          <Grid item xs={12}>
            <Button color="secondary" className="circular-btn" size="large" fullWidth>Crear cuenta</Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <Link component={NextLink} href="/auth/login" passHref underline="always">
              ¿Ya tienes una cuenta?
            </Link>
          </Grid>

        </Grid>

      </Box>

    </AuthLayout>
  );
};

export default RegisterPage;