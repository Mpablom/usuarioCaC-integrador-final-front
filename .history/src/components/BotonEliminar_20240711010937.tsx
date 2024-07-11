import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import EliminarUsuario from "./EliminarUsuario";

interface BotonEliminarProps {
    usuarioId: number;
    onUsuarioEliminado: () => void;
}

const BotonEliminar: React.FC<BotonEliminarProps> = ({ usuarioId, onUsuarioEliminado }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} color="secondary">
        <DeleteIcon />
      </IconButton>
      {open && (
        <EliminarUsuario
          usuarioId={usuarioId}
          onClose={handleClose}
          onUsuarioEliminado={onUsuarioEliminado}
        />
      )}
    </>
  );
};

export default BotonEliminar;
