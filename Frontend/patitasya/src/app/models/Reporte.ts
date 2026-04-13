import { PostStatus, PostType } from "./enums";

export interface PetReport {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: PostType;
  estado: PostStatus;
  ubicacion: string;
  latitud?: number;
  longitud?: number;
  createdAt: Date;
  usuarioId: number;
  usuarioNombre: string;
  fotos: string[];
}

export interface PetReportRequest {
  titulo: string;
  descripcion: string;
  tipo: PostType;
  ubicacion: string;
  latitud?: number;
  longitud?: number;
}

export interface PetReportResponse {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: PostType;
  estado: PostStatus;
  ubicacion: string;
  latitud?: number;
  longitud?: number;
  createdAt: Date;
  usuarioNombre: string;
  fotos: string[];
}

// Para mostrar textos amigables
export const PostTypeLabels = {
  [PostType.PERDIDA]: '🐕 Perdido',
  [PostType.ENCONTRADA]: '🐈 Encontrado',
  [PostType.ADOPCION]: '🐾 En adopción'
};

export const PostStatusLabels = {
  [PostStatus.ACTIVA]: 'Activa',
  [PostStatus.RESUELTA]: 'Resuelta'
};
