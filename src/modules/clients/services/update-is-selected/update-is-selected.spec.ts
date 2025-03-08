import { beforeEach, describe, expect, it } from 'vitest';

import { NotFoundException } from '@nestjs/common';
import { InMemoryClientRepository } from 'test/repositories/in-memory-client-repository';
import { UpdateIsSelectService } from './update-is-selected.service';
import { randomUUID } from 'node:crypto';

describe('UpdateIsSelectService', () => {
  let service: UpdateIsSelectService;
  let repository: InMemoryClientRepository;

  beforeEach(() => {
    repository = new InMemoryClientRepository();
    service = new UpdateIsSelectService(repository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update the isSelect property of a client', async () => {
    const clientData = {
      id: randomUUID(),
      name: 'Test Client',
      companyValue: 10000,
      user: { id: randomUUID() },
      isSelect: false,
      deletedAt: null,
    };

    await repository.save(clientData as any);

    const updatedClient = await service.updateIsSelect({
      clientId: clientData.id,
      isSelect: true,
    });

    expect(updatedClient).toBeDefined();
    expect(updatedClient.id).toBe(clientData.id);
    expect(updatedClient.isSelect).toBe(true);
  });

  it('should throw NotFoundException if client does not exist', async () => {
    await expect(
      service.updateIsSelect({
        clientId: '999',
        isSelect: true,
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
