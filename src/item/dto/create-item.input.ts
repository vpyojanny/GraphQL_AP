import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  // Constructor para inicializar las propiedades
  constructor(nombre: string, descripcion: string) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}
