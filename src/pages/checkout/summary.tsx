import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import NextLink from 'next/link';

const SummaryPage = () => {
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
              <Typography variant="h2">Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Dirección de entrega</Typography>
                <Link component={NextLink} href="/checkout/address" underline="always" passHref>
                  Editar
                </Link>
              </Box>


              <Typography>Adrian Arcelles</Typography>
              <Typography>322 Algun lugar</Typography>
              <Typography>Sttesville, HTYA 23S</Typography>
              <Typography>Costa Rica</Typography>
              <Typography>+1 12345678</Typography>

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