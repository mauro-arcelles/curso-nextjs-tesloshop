import { IProduct } from "@/interfaces";
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import NextLink from 'next/link';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;

  }, [isHovered]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link component={NextLink} href={`/product/${product.slug}`} passHref prefetch={false}>
          <CardActionArea>
            <CardMedia
              component="img"
              className="fadeIn"
              image={productImage}
              alt={product.title}
              onLoad={() => setIsImageLoaded(true)}
            />

          </CardActionArea>
        </Link>
      </Card>

      <Box sx={{ marginTop: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>

    </Grid>
  );
};
