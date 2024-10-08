import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { CartContext } from "@/context";
import { countries } from "@/utils";
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import NextLink from 'next/link';
import { useContext } from "react";

const SummaryPage = () => {

  const { shippingAddress, numberOfItems } = useContext(CartContext);

  if (!shippingAddress) {
    return <></>;
  }

  return (
    <ShopLayout title={"Resumen de orden"} pageDescription={"Resumen de la orden"}>
      <Typography variant="h1" component="h1">Resumen de la orden</Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Dirección de entrega</Typography>
                <Link component={NextLink} href="/checkout/address" underline="always" passHref>
                  Editar
                </Link>
              </Box>


              <Typography>{shippingAddress?.firstName} {shippingAddress?.lastName}</Typography>
              <Typography>{shippingAddress?.address}{shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
              <Typography>{shippingAddress?.city}, {shippingAddress.zip}</Typography>
              <Typography>{countries.find(c => c.code === shippingAddress.country)?.name}</Typography>
              <Typography>{shippingAddress?.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <Link component={NextLink} href="/cart" underline="always" passHref>
                  Editar
                </Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>Confirmar Orden</Button>
              </Box>
            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </ShopLayout>
  );
};

export default SummaryPage;