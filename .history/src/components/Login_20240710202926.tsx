import { Usuario, UsuarioLogin } from "../models/UsuarioModel";

export async function login(json: UsuarioLogin): Promise<Usuario|undefined> {
    try {
        const response = await api.post(`/usuarios/login`, json);
        return response.data;
    } catch (error) {
        console.log('Error al logear usuario: ', error);
    }
}