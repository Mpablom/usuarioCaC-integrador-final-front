import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { deleteUsuario } from '../axios/UsuarioApi';

interface EliminarUsuarioProps {
  usuarioId: number;
  onClose: () => void;
  onUsuarioEliminado: () => void;
}

const EliminarUsuario: React.FC<EliminarUsuarioProps> = ({ usuarioId, onClose, onUsuarioEliminado }) => {
  const handleEliminar = async () => {
    try {
      await deleteUsuario(usuarioId);
      onUsuarioEliminado();
      onClose();
    } catch (error) {
      console.error('Error eliminando el usuario:', error);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
    >
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar este usuario?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleEliminar} color="secondary">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EliminarUsuario;
