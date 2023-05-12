import { ShopLayout } from "@/components/layouts";
import { VisibilityOutlined } from "@mui/icons-material";
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import NextLink from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Nombre completo', width: 200 },
  {
    field: 'paid',
    headerName: 'Pagado',
    description: 'Esta columna indica si el cliente ha pagado la orden',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid
          ? <Chip color="success" label="Pagada" variant="outlined" />
          : <Chip color="error" label="No pagada" variant="outlined" />
      );
    }
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link component={NextLink} href={`/orders/${params.row.id}`} passHref>
          <VisibilityOutlined />
        </Link>
      );
    }
  }
];

const rows = [
  { id: 1, fullName: 'Snow Jon', paid: true },
  { id: 2, fullName: 'Lannister Cersei', paid: false },
  { id: 3, fullName: 'Lannister Jaime', paid: true },
  { id: 4, fullName: 'Stark Arya', paid: true },
  { id: 5, fullName: 'Targaryen Daenerys', paid: false },
  { id: 6, fullName: 'Melisandre', paid: true },
];

const HistoryPage = () => {

  return (
    <ShopLayout title="Historial de ordenes" pageDescription="Historial de ordenes del cliente">
      <Typography variant="h1" component="h1">Historial de ordenes</Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 }
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>

    </ShopLayout>
  );
};

export default HistoryPage;