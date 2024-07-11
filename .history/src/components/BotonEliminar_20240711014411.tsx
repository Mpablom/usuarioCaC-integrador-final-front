import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EliminarUsuario from './EliminarUsuario';

interface BotonEliminarProps {
  usuarioId: number;
  onUsuarioEliminado: () => void;
}

const BotonEliminar: React.FC<BotonEliminarProps> = ({ usuarioId, onUsuarioEliminado }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await EliminarUsuario({ usuarioId, onClose: handleClose, onUsuarioEliminado });
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    }
    handleClose();
    onUsuarioEliminado();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon sx={{ color: 'red' }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEliminar} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BotonEliminar;
