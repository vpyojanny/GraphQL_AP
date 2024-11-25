import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(async () => {
    const mockItemRepository = {
      // Simula los métodos utilizados en ItemService
      find: jest.fn(),
      save: jest.fn(),
    };

    const mockRabbitMqService = {
      // Simula los métodos utilizados en ItemService
      sendMessage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        { provide: 'ItemRepository', useValue: mockItemRepository },
        { provide: 'RABBITMQ_SERVICE', useValue: mockRabbitMqService },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
