import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';  // Importa los decoradores necesarios

@ObjectType()  // Decorador de GraphQL que indica que esta clase es un tipo de salida
@Entity()
export class Item {
  @Field(() => Int)  // Decorador para especificar que el campo 'id' es de tipo 'Int'
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()  // Decorador para el campo 'nombre'
  @Column()
  nombre!: string;

  @Field()  // Decorador para el campo 'descripcion'
  @Column()
  descripcion!: string;

  @Field()  // Decorador para el campo 'fechaCreacion'
  @CreateDateColumn()
  fechaCreacion!: Date;
}
