import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormGroup, Checkbox } from "@mui/material";
import { Usuario } from "../models/UsuarioModel";
import { deleteUsuario, getUsuarios, restoreUsuario } from "../axios/UsuarioApi";
import BotonEliminar from "./BotonEliminar";
import BotonRestaurar from "./BotonRestaurar";
import CrearUsuario from "./CrearUsuario";
import ActualizarUsuario from "./ActualizarUsuario";
//import ActualizarUsuario from "./ActualizarUsuario";

interface UsuariosTableProps {
  usuariosIniciales: Usuario[];
}

const UsuariosTable: React.FC<UsuariosTableProps> = ({ usuariosIniciales }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciales || []);
  const [crearOActualizar, setCrearOActualizar] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"crear" | "actualizar" | null>(null); 
  const fetchUsuarios = async () => {
    try {
      const usuariosData = await getUsuarios();
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error fetching usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios(); 
  }, []);

  const handleUsuarioEliminado = async (usuarioId: number) => {
    try {
      await deleteUsuario(usuarioId);
      setUsuarios(usuarios.map((usuario) =>
        usuario.id === usuarioId ? { ...usuario, estaEliminado: true } : usuario
      ));
    } catch (error) {
      console.error("Error deleting usuario:", error);
    }
  };

  const handleUsuarioRestaurado = async (usuarioId: number) => {
    try {
      await restoreUsuario(usuarioId);
      setUsuarios(usuarios.map((usuario) =>
        usuario.id === usuarioId ? { ...usuario, estaEliminado: false } : usuario
      ));
    } catch (error) {
      console.error("Error restoring usuario:", error);
    }
  };
  const handleUsuarioCreado = () => {
    fetchUsuarios(); 
  };

   const handleChangeCrearOActualizar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrearOActualizar(event.target.checked);
    setSelectedOption(null);
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as "crear" | "actualizar";

    setSelectedOption(prevOption => {
      if (prevOption === value) {
        return null;
      } else {
        return value;
      }
    });
  };
   const usuarioInicial: Usuario = {
    id: 0,
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    rol: 'STANDARD'  
  };

  return (
    <Card sx={{ maxWidth: 700, margin: "auto", boxShadow: 10, my: 10, p: 2, pt: 0, bgcolor: "#B4B4AA" }} >
      <CardContent>
        <Typography variant="h4" component="h1" p={4} textAlign={"center"} fontWeight={500}>
          Lista de Usuarios
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ borderColor: "#b4b4aa" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Nombre</TableCell>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Apellido</TableCell>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Nombre de Usuario</TableCell>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Rol</TableCell>
                <TableCell sx={{ borderColor: "#b4b4aa" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id} sx={{ borderColor: "#b4b4aa", "&:hover": { backgroundColor: "#f5f5f5" } }}>
                  <TableCell sx={{ borderColor: "#b4b4aa", color: usuario.estaEliminado ? "red" : "inherit" }}>
                    {usuario.nombre}
                  </TableCell>
                  <TableCell sx={{ borderColor: "#b4b4aa", color: usuario.estaEliminado ? "red" : "inherit" }}>
                    {usuario.apellido}
                  </TableCell>
                  <TableCell sx={{ borderColor: "#b4b4aa", color: usuario.estaEliminado ? "red" : "inherit" }}>
                    {usuario.username}
                  </TableCell>
                  <TableCell sx={{ borderColor: "#b4b4aa", color: usuario.estaEliminado ? "red" : "inherit" }}>
                    {usuario.rol}
                  </TableCell>
                  <TableCell sx={{ borderColor: "#b4b4aa" }}>
                    {usuario.estaEliminado ? (
                      <BotonRestaurar
                        usuarioId={usuario.id!}
                        onUsuarioRestaurado={() => handleUsuarioRestaurado(usuario.id!)}
                      />
                    ) : (
                      <BotonEliminar
                        usuarioId={usuario.id!}
                        onUsuarioEliminado={() => handleUsuarioEliminado(usuario.id!)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
         <Card sx={{ mt: 2, px: 3, display:'flex', flexDirection:'column', alignItems:'center', boxShadow: 10 }}>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={crearOActualizar} onChange={handleChangeCrearOActualizar} />}
                label="¿Desea agregar o actualizar un usuario?"
              />
            </FormGroup>
          </FormControl>
          {crearOActualizar && (
            <RadioGroup row value={selectedOption} onChange={handleChangeOption}>
              <FormControlLabel value="crear" control={<Radio />} label="Crear Usuario" />
              <FormControlLabel value="actualizar" control={<Radio />} label="Actualizar Usuario" />
            </RadioGroup>
          )}
          {selectedOption === "crear" && (
            <CrearUsuario
              usuarioInicial={usuarioInicial}
              onUsuarioCreado={handleUsuarioCreado}
              submitButtonText="Crear Usuario"
              isUpdating={false}
            />
          )}
          {selectedOption === "actualizar" && <ActualizarUsuario onUsuarioActualizado={handleUsuarioCreado} />}
        </Card>
      </CardContent>
    </Card>
  );
};

export default UsuariosTable;
