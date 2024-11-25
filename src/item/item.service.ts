import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';  // Importa el DTO
import { Cron, CronExpression } from '@nestjs/schedule';  // Importa Cron
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LessThan } from 'typeorm';  // Importa LessThan de TypeORM

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitMqService: ClientProxy, // Inyecta el servicio de RabbitMQ
  ) {}

  // Método para obtener todos los items
  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  // Método para crear un nuevo item
  async create(createItemInput: CreateItemInput): Promise<Item> {
    const item = this.itemRepository.create(createItemInput);  // Crea un nuevo item
    const savedItem = await this.itemRepository.save(item);  // Guarda el item en la base de datos
    this.rabbitMqService.emit('item_created', savedItem);  // Envía un mensaje a RabbitMQ
    return savedItem;
  }

  // CronJob para limpiar registros más antiguos de 30 días
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)  // Se ejecutará todos los días a medianoche
  async cleanOldRecords() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    await this.itemRepository.delete({
      fechaCreacion: LessThan(thirtyDaysAgo),  // Usa LessThan en lugar de $lt
    });
    console.log('Registros antiguos eliminados');
  }
}
