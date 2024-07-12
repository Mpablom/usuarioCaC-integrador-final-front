import React, { useEffect, useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Usuario } from "../models/UsuarioModel";
import { getUsuarios } from "../axios/UsuarioApi";

interface SelectUsuariosProps {
  label: string;
  onChange: (selectedUserId: number) => void;
}

const SelectUsuarios: React.FC<SelectUsuariosProps> = ({ label, onChange }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <FormControl fullWidth sx={{ boxShadow: 0}}>
      <InputLabel >{label}</InputLabel>
      <Select onChange={(e) => onChange(Number(e.target.value))} sx={{ mb: 2 }}>
        {usuarios.map((usuario) => (
          <MenuItem key={usuario.id} value={usuario.id} >
            {usuario.nombre} {usuario.apellido}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectUsuarios;
