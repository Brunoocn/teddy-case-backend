import { beforeEach, describe, expect, it } from 'vitest';

import { NotFoundException } from '@nestjs/common';
import { InMemoryClientRepository } from 'test/repositories/in-memory-client-repository';
import { DeleteService } from './delete.service';
import { randomUUID } from 'crypto';

describe('DeleteService', () => {
  let service: DeleteService;
  let repository: InMemoryClientRepository;

  beforeEach(() => {
    repository = new InMemoryClientRepository();
    service = new DeleteService(repository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should soft delete a client by clientId', async () => {
    const clientData = {
      id: randomUUID(),
      name: 'Test Client',
      user: { id: 1 },
      deletedAt: null,
    };

    await repository.save(clientData as any);

    await service.delete({ clientId: clientData.id });

    const deletedClient = await repository.findOne({
      where: {
        id: clientData.id,
      },
    });

    expect(deletedClient).toBeDefined();
    expect(deletedClient.deletedAt).not.toBeNull();
  });

  it('should throw NotFoundException if client does not exist', async () => {
    try {
      await service.delete({ clientId: '1' });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Client with ID 1 not found');
    }
  });
});
