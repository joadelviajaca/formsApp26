export interface Persona {
	nombre: string;
	favoritos: Favorito[]
}

export interface PersonaS {
    genre: string;
    notifications: boolean;
}

export interface Favorito{
	id: number;
	nombre: string;
}