import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  currentValue: number;
  updateQuantity: (quantity: number) => void;
  maxValue: number;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity }) => {

  const onQuantiyChange = (qty: number) => {
    if (currentValue + qty < 1 || currentValue + qty > maxValue) return;

    updateQuantity(currentValue + qty);
  };

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => onQuantiyChange(-1)}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>

      <IconButton onClick={() => onQuantiyChange(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
