import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql'; // Importa el módulo GraphQL
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // Importa ApolloDriver
import { Item } from './item/entities/item.entity'; // Tu entidad
import { ItemResolver } from './item/item.resolver'; // Asegúrate de que estás importando el resolver
import { ItemService } from './item/item.service'; // Importa el servicio
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';  // Importa el módulo de programación de tareas
import { ClientProxyFactory, Transport } from '@nestjs/microservices';  // Importa RabbitMQ

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'graphql_ap',
      entities: [Item],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    TypeOrmModule.forFeature([Item]), // Importa el repositorio de Item
    ScheduleModule.forRoot(), // Inicia el módulo de programación de tareas
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ItemService,
    ItemResolver, 
    {
      provide: 'RABBITMQ_SERVICE', // Configura RabbitMQ para comunicación asíncrona
      useFactory: () => 
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'], // URL de RabbitMQ
            queue: 'items_queue', // Cola donde se enviarán los mensajes
          },
        }),
    },
  ],
})
export class AppModule {}
