import { beforeEach, describe, expect, it } from 'vitest';
import { FindOneService } from './find-one.service';
import { InMemoryClientRepository } from 'test/repositories/in-memory-client-repository';
import { randomUUID } from 'node:crypto';

describe('FindOneService', () => {
  let service: FindOneService;
  let repository: InMemoryClientRepository;

  beforeEach(() => {
    repository = new InMemoryClientRepository();
    service = new FindOneService(repository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a client by clientId', async () => {
    const userId = randomUUID();
    const clientId = randomUUID();
    const clientData = {
      id: clientId,
      name: 'Test Client',
      user: { id: userId },
      deletedAt: null,
    };

    await repository.save(clientData as any);

    const result = await service.findOne({ clientId });

    expect(result).toBeDefined();
    expect(result.id).toBe(clientId);
    expect(result.user.id).toBe(userId);
  });

  it('should return undefined if the client does not exist', async () => {
    const result = await service.findOne({
      clientId: randomUUID(),
    });

    expect(result).toBeUndefined();
  });
});
