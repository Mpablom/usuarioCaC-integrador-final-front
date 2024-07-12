import React, { useState } from "react";
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { restoreUsuario } from "../axios/UsuarioApi";

interface BotonRestaurarProps {
  usuarioId: number;
  onUsuarioRestaurado: () => void;
}

const BotonRestaurar: React.FC<BotonRestaurarProps> = ({ usuarioId, onUsuarioRestaurado }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRestore = async () => {
    try {
      await restoreUsuario(usuarioId);
      onUsuarioRestaurado();
      handleClose();
    } catch (error) {
      console.error("Error restoring usuario:", error);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="primary">
        <RestoreIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Restauración</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Está seguro de que desea restaurar este usuario?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancelar</Button>
          <Button onClick={handleRestore} color="primary">Restaurar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BotonRestaurar;
