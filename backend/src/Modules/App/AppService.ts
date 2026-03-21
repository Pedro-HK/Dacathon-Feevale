import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createItem(): string {
    return 'Item created';
  }

  updateItem(): string {
    return 'Item updated';
  }

  deleteItem(): string {
    return 'Item deleted';
  }

  readItem(): string {
    return 'Item read';
  }

  listItems(): string {
    return 'Items listed';
  }

  searchItems(): string {
    return 'Items searched';
  }
}
