import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '@/context';


export const Navbar = () => {

  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>

        <Link component={NextLink} display='flex' alignItems='center' href='/' passHref>
          <Typography variant="h6">Teslo </Typography>
          <Typography sx={{ ml: 0.5 }}>Shop </Typography>
        </Link>

        <Box flex={1} />

        <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className='fadeIn'>
          <Link component={NextLink} href='/category/men' passHref>
            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
          </Link>

          <Link component={NextLink} href='/category/women' passHref>
            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
          </Link>

          <Link component={NextLink} href='/category/kid' passHref>
            <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
          </Link>
        </Box>

        <Box flex={1} />

        {
          isSearchVisible
            ? (
              <Input
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && onSearchTerm()}
                type='text'
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            : (
              <IconButton
                className='fadeIn'
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                onClick={() => setIsSearchVisible(true)}
              >
                <SearchOutlined />
              </IconButton>
            )
        }



        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <Link component={NextLink} href='/cart' passHref>
          <IconButton>
            <Badge badgeContent={2} color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>

        <Button onClick={toggleSideMenu}>Menú</Button>

      </Toolbar>
    </AppBar>
  );
};
