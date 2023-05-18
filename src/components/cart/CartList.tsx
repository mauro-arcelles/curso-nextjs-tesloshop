import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import NextLink from 'next/link';
import { ItemCounter } from "../ui";
import { FC, useContext } from "react";
import { CartContext } from "@/context";
import { ICartProduct } from "@/interfaces";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    updateCartQuantity({ ...product, quantity: newQuantityValue });
  };

  return (
    <>
      {
        cart.map((product) => (
          <Grid container key={product.slug + product.size} spacing={2} sx={{ mb: 1 }}>

            <Grid item xs={3}>
              <Link href={`/product/${product.slug}`} passHref component={NextLink}>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
                    component="img"
                    sx={{ borderRadius: '10px' }}
                  />
                </CardActionArea>
              </Link>
            </Grid>

            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">Talla: <strong>{product.size}</strong></Typography>

                {
                  editable
                    ? (
                      <ItemCounter
                        currentValue={product.quantity}
                        maxValue={10}
                        updateQuantity={(value) => onNewCartQuantityValue(product, value)}
                      />
                    )
                    : (
                      <Typography variant="h5">{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                    )
                }
              </Box>

            </Grid>

            <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
              <Typography variant="subtitle1">${product.price}</Typography>
              {
                editable &&
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => removeCartProduct(product)}
                >
                  Remover
                </Button>
              }
            </Grid>

          </Grid>
        ))
      }
    </>
  );
};
