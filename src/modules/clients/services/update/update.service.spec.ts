import { InMemoryClientRepository } from 'test/repositories/in-memory-client-repository';
import { UpdateService } from './update.service';
import { randomUUID } from 'node:crypto';
import { NotFoundException } from '@nestjs/common';

describe('UpdateService', () => {
  let service: UpdateService;
  let repository: InMemoryClientRepository;

  beforeEach(() => {
    repository = new InMemoryClientRepository();
    service = new UpdateService(repository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update an existing client', async () => {
    const clientData = {
      id: randomUUID(),
      name: 'Old Client Name',
      companyValue: 10000,
      user: { id: randomUUID() },
      deletedAt: null,
    };

    await repository.save(clientData as any);

    const updatedClient = await service.update({
      clientId: clientData.id,
      name: 'Updated Client Name',
      companyValue: 20000,
      userId: clientData.user.id,
    });

    expect(updatedClient).toBeDefined();
    expect(updatedClient.id).toBe(clientData.id);
    expect(updatedClient.name).toBe('Updated Client Name');
    expect(updatedClient.companyValue).toBe(20000);
  });

  it('should throw NotFoundException if client does not exist', async () => {
    await expect(
      service.update({
        clientId: randomUUID(),
        name: 'Updated Name',
        companyValue: 15000,
        userId: randomUUID(),
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
