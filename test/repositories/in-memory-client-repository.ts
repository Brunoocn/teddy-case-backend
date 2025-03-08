import { randomUUID } from 'crypto';
import { Client } from 'src/modules/database/entities/client.entity';
import { FindOptionsWhere } from 'typeorm';

export class InMemoryClientRepository {
  private clients: Client[] = [];

  async create(data: Partial<Client>): Promise<Client> {
    const client = { id: randomUUID(), ...data } as Client;
    return client;
  }

  async save(client: Client): Promise<Client> {
    this.clients.push(client);
    return client;
  }

  async find(): Promise<Client[]> {
    return this.clients;
  }

  async findAndCount(options?: {
    where?: Partial<Client>;
    skip?: number;
    take?: number;
  }): Promise<[Client[], number]> {
    let filteredClients = this.clients.filter(
      (client) =>
        (!options.where?.user?.id ||
          client.user?.id === options.where.user.id) &&
        (options.where?.deletedAt === undefined ||
          client.deletedAt === options.where.deletedAt),
    );

    const total = filteredClients.length;

    if (options.skip !== undefined && options.take !== undefined) {
      filteredClients = filteredClients.slice(
        options.skip,
        options.skip + options.take,
      );
    }

    return [filteredClients, total];
  }

  async findOneBy(
    where: FindOptionsWhere<Client>,
  ): Promise<Client | undefined> {
    return this.clients.find((client) =>
      Object.entries(where).every(([key, value]) => client[key] === value),
    );
  }

  async findOne(options: {
    where: FindOptionsWhere<Client>;
  }): Promise<Client | undefined> {
    return this.clients.find((client) => {
      return Object.entries(options.where).every(([key, value]) => {
        if (key === 'user') {
          return client.user?.id === (value as any).id;
        }
        return client[key] === value;
      });
    });
  }

  async softRemove(client: Client): Promise<Client> {
    const clientIndex = this.clients.findIndex(
      (c) => c.id === client.id && c.deletedAt === null,
    );

    if (clientIndex === -1) {
      return;
    }

    this.clients[clientIndex] = Object.assign(new Client(), {
      ...this.clients[clientIndex],
      deletedAt: new Date(),
    });

    return this.clients[clientIndex];
  }
}
