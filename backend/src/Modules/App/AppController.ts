import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './AppService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create')
  createItem(): string {
    return this.appService.createItem();
  }

  @Post('/update')
  updateItem(): string {
    return this.appService.updateItem();
  }

  @Post('/delete')
  deleteItem(): string {
    return this.appService.deleteItem();
  }

  @Post('/read')
  readItem(): string {
    return this.appService.readItem();
  }

  @Post('/list')
  listItems(): string {
    return this.appService.listItems();
  }

  @Post('/search')
  searchItems(): string {
    return this.appService.searchItems();
  }
}
