import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './ProgressController';
import { ProgressService } from './ProgressService';
import { User } from '@modules/User/User.entity';

describe('ProgressController', () => {
    let controller: ProgressController;
    let service: ProgressService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProgressController],
            providers: [
                {
                    provide: ProgressService,
                    useValue: {
                        markCompleted: jest.fn().mockResolvedValue(['id-da-materia']),
                        getCompletedIds: jest.fn().mockResolvedValue([]),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProgressController>(ProgressController);
        service = module.get<ProgressService>(ProgressService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('markCompleted', () => {
        it('deve marcar como concluído com sucesso', async () => {
            const mockUser = { id: 1 } as unknown as User;
            const subjectId = 'matematica-101';

            const result = await controller.markCompleted(mockUser, subjectId);

            expect(result).toEqual({ completedIds: expect.any(Array) });
        });
    });
});