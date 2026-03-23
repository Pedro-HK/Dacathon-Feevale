import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../User/User.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getCompletedIds(userId: string): Promise<string[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return user.completedIds ?? [];
  }

  async markCompleted(userId: string, subjectId: string): Promise<string[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const completedIds = user.completedIds ?? [];
    if (!completedIds.includes(subjectId)) completedIds.push(subjectId);

    user.completedIds = completedIds;
    await this.userRepository.save(user);

    return user.completedIds;
  }

  async unmarkCompleted(userId: string, subjectId: string): Promise<string[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    user.completedIds = (user.completedIds ?? []).filter((id) => id !== subjectId);
    await this.userRepository.save(user);

    return user.completedIds;
  }
}
