export interface Usuario {
  id?: number;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  rol: string;
  estaEliminado: boolean;
  message?: string;
}

export interface UsuarioLogin {
  username: string;
  password: string;
}