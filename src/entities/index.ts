import { AuthorEntity } from './author';
import { BookEntity } from './book';
import { BookUserEntity } from './book_user';
import { CollectionEntity } from './collection';
import { CollectionBookEntity } from './collection_book';
import { CollectionUserAddEntity } from './collection_user_add';
import { GenreEntity } from './genre';
import { RoleEntity } from './role';
import { TagEntity } from './tag';
import { UserEntity } from './user';
import { UserBookTagEntity } from './user_book_tag';

export default [
    AuthorEntity,
    BookUserEntity,
    BookEntity,
    CollectionBookEntity,
    CollectionUserAddEntity,
    CollectionEntity,
    GenreEntity,
    RoleEntity,
    TagEntity,
    UserBookTagEntity,
    UserEntity
];
