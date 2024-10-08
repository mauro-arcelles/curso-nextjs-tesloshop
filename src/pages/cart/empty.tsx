import { ShopLayout } from "@/components/layouts";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import NextLink from 'next/link';


const EmptyPage = () => {
  return (
    <ShopLayout title={"Carrito vacío"} pageDescription={"No hay articulos en el carrito de compras "}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 100px)'
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />

        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography>Su carrito está vacío</Typography>
          <Link component={NextLink} href="/" passHref typography="h4" color="secondary">
            Regresar
          </Link>
        </Box>

      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
