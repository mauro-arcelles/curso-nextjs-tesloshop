import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';


export const Navbar = () => {

  return (
    <AppBar>
      <Toolbar>

        <Link component={NextLink} display='flex' alignItems='center' href='/' passHref>
          <Typography variant="h6">Teslo </Typography>
          <Typography sx={{ ml: 0.5 }}>Shop </Typography>
        </Link>

        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Link component={NextLink} href='/category/men' passHref>
            <Button>Hombres</Button>
          </Link>

          <Link component={NextLink} href='/category/women' passHref>
            <Button>Mujeres</Button>
          </Link>

          <Link component={NextLink} href='/category/kid' passHref>
            <Button>Niños</Button>
          </Link>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <Link component={NextLink} href='/cart' passHref>
          <IconButton>
            <Badge badgeContent={2} color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>

        <Button>Menú</Button>

      </Toolbar>
    </AppBar>
  );
};
