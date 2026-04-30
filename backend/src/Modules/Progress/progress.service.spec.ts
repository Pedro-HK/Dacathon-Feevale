import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressService } from './ProgressService';
import { User } from '../User/User.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProgressService', () => {
  let service: ProgressService;
  let repository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgressService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<ProgressService>(ProgressService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('markCompleted', () => {
    it('deve adicionar um subjectId ao array de completados', async () => {
      const mockUser = { id: '1', completedIds: [] } as unknown as User;
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue({ ...mockUser, completedIds: ['math101'] });

      const result = await service.markCompleted('1', 'math101');

      expect(result).toContain('math101');
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('deve lançar NotFoundException se o usuário não existir', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.markCompleted('999', 'math101'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('getCompletedIds', () => {
    it('deve retornar uma lista de IDs ou um array vazio', async () => {
      const mockUser = { id: '1', completedIds: ['math101'] } as User;
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.getCompletedIds('1');

      expect(result).toEqual(['math101']);
    });
  });
});