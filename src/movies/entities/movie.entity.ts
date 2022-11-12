import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text', {
        unique: true,
    })
    name: string;

    @Column('text')
    synopsis: string;

    @Column('date')
    releaseDate: Date;
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
        default: 40,
    })
    duration: number;

    @Column('date')
    lastUpdated: Date;

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
    @BeforeInsert()
    checkDateInsert() {
        if (!this.lastUpdated) {
            this.lastUpdated = new Date();
        }
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.name;

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
    @BeforeUpdate()
    checkDateUpdate() {
        this.lastUpdated = new Date();
    }
}
