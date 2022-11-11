import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Movie {
    @PrimaryColumn('uuid')
    id: string;
    @Column('text', {
        unique: true,
    })
    name: string;

    @Column('text')
    synopsis: string;

    @Column()
    releaseDate: number;
    @Column('text', {
        unique: true,
    })
    slug: string;

    @Column('text', {
        array: true,
    })
    genre: string[];

    @Column('int', {
        default: 0,
    })
    rating: number;

    @Column('text')
    director: string;

    @Column('text')
    mainActor: string;

    @Column('int', {
        default: 0,
    })
    duration: number;

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.name;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        if (!this.slug) {
            this.slug = this.name;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
}
