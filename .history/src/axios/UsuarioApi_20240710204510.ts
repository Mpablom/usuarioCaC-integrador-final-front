import api from './Api';
import { Usuario, UsuarioLogin } from '../models/UsuarioModel';

export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get('/usuarios');
  return response.data;
};

export const getUsuarioById = async (id: number): Promise<Usuario> => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const createUsuario = async (usuario: Usuario): Promise<void> => {
  const response = await api.post('/usuarios', usuario);
  return response.data;
};

export const updateUsuario = async (id: number, usuario: Usuario): Promise<void> => {
  const response = await api.put(`/usuarios/${id}`, usuario);
  return response.data;
};

export const deleteUsuario = async (id: number): Promise<void> => {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
};

export const restoreUsuario = async (id: number): Promise<void> => {
  const response = await api.patch(`/usuarios/${id}`);
  return response.data;
};
export const login = async(json: UsuarioLogin): Promise<Usuario> => {
  const response = await api.post(`/usuarios/login`, json);
  return response.data;
}
