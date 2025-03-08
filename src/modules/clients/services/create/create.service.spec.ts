import { beforeEach, describe, expect, it } from 'vitest';
import { CreateService } from './create.service';
import { InMemoryClientRepository } from 'test/repositories/in-memory-client-repository';
import { randomUUID } from 'crypto';

describe('CreateService', () => {
  let service: CreateService;
  let repository: InMemoryClientRepository;

  beforeEach(() => {
    repository = new InMemoryClientRepository();
    service = new CreateService(repository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new client', async () => {
    const clientData = {
      name: 'Test Client',
      companyValue: 5000,
      userId: randomUUID(),
    };

    const client = await service.create(clientData);

    expect(client).toBeDefined();
    expect(client.id).toBeDefined();
    expect(client.name).toBe(clientData.name);
    expect(client.companyValue).toBe(clientData.companyValue);
    expect(client.user.id).toBe(clientData.userId);
  });

  it('should not create a client with the same name', async () => {
    const clientData = {
      name: 'Test Client',
      companyValue: 5000,
      userId: randomUUID(),
    };

    await service.create(clientData);

    try {
      await service.create(clientData);
    } catch (error) {
      expect(error.message).toBe('Client already exists');
    }
  });
});
