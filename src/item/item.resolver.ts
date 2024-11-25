import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { CreateItemInput } from './dto/create-item.input';  // Asegúrate de tener este DTO para la entrada

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  // Consulta para obtener todos los items
  @Query(() => [Item])
  async getItems(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  // Mutación para crear un nuevo item
  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,  // El input de la mutación
  ): Promise<Item> {
    return this.itemService.create(createItemInput);  // Llama al servicio para crear el item
  }
}
