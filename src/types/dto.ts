export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    profile_picture?: string;
    role_id: number;
}

export type UpdateUserDTO = {
    name?: string;
    email?: string;
    profile_picture?: string;
    role_id?: number;
}

export type CreateBookDTO = {
    title: string;
    synopsis: string;
    url_image: string;
    genre_id: number;
    author_id: number;
}

export type UpdateBookDTO = {
    title: string;
    synopsis: string;
    url_image: string;
    genre_id: number;
    author_id: number;
}

export type CreateAuthorDTO = {
    name: string;
    description?: string;
}

export type UpdateAuthorDTO = {
    name: string;
    description?: string;
}

export type CreateGenreDTO = {
    name: string;
}

export type UpdateGenreDTO = {
    name: string;
}

export type CreateCollectionDTO = {
    title: string;
    description?: string;
    owner_id: number;
}

export type UpdateCollectionDTO = {
    title?: string;
    description?: string;
}

export type CreateTagDTO = {
    name: string;
}

export type UpdateTagDTO = {
    name: string;
}

export type CreateInteractionDTO = {
   user_id: number;
   book_id: number;
   already_read: boolean;
   want_to_read: boolean;
   liked: boolean;
}

export type UpdateInteractionDTO = {
    already_read?: boolean;
    want_to_read?: boolean;
    liked?: boolean;
}
