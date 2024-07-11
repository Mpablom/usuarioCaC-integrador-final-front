import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import api from '../axios/Api';
import { Usuario } from '../models/UsuarioModel';

const UsuariosTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await api.getUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            {/* Agrega más columnas según los campos que desees mostrar */}
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.apellido}</TableCell>
              <TableCell>{usuario.username}</TableCell>
              <TableCell>{usuario.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsuariosTable;
