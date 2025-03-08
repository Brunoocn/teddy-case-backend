import { beforeEach, describe, expect, it } from 'vitest';

import { getTotalPages } from 'src/shared/get-total-pages';
import { randomUUID } from 'node:crypto';
import { InMemoryClientRepository } from 'test/repositories/in-memory-client-repository';
import { FindAllService } from './find-all.service';

describe('FindAllService', () => {
  let service: FindAllService;
  let repository: InMemoryClientRepository;

  beforeEach(() => {
    repository = new InMemoryClientRepository();
    service = new FindAllService(repository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a paginated list of clients for a given userId', async () => {
    const userId = '1';
    const clientsData = Array.from({ length: 10 }, (_, i) => ({
      id: randomUUID(),
      name: `Client ${i + 1}`,
      user: { id: userId },
      deletedAt: null,
    }));

    for (const client of clientsData) {
      await repository.save(client as any);
    }

    const page = 1;
    const pageSize = 5;

    const result = await service.findAll({ page, pageSize, userId });

    expect(result.list.length).toBe(5);
    expect(result.paging.total).toBe(10);
    expect(result.paging.page).toBe(page);
    expect(result.paging.pages).toBe(getTotalPages({ total: 10, pageSize }));
  });

  it('should exclude clients that have been soft deleted', async () => {
    const userId = '1';
    const clientsData = [
      {
        id: randomUUID(),
        name: 'Client 1',
        user: { id: userId },
        deletedAt: null,
      },
      {
        id: randomUUID(),
        name: 'Client 2',
        user: { id: userId },
        deletedAt: new Date(),
      },
    ];

    for (const client of clientsData) {
      await repository.save(client as any);
    }

    const result = await service.findAll({ page: 1, pageSize: 10, userId });

    expect(result.list.length).toBe(1);
  });

  it('should return an empty list if no clients match the userId', async () => {
    const userId = '1';
    const clientsData = [
      {
        id: randomUUID(),
        name: 'Client 1',
        user: { id: '2' },
        deletedAt: null,
      },
      {
        id: randomUUID(),
        name: 'Client 2',
        user: { id: '2' },
        deletedAt: null,
      },
    ];

    for (const client of clientsData) {
      await repository.save(client as any);
    }

    const result = await service.findAll({ page: 1, pageSize: 10, userId });

    expect(result.list.length).toBe(0);
  });
});
