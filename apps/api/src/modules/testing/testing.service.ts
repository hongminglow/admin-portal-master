import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTestingDto, UpdateTestingDto } from './dto/testing.dto'
import { TestingEntity } from './testing.entity'

@Injectable()
export class TestingService {
  constructor(
        @InjectRepository(TestingEntity)
        private readonly testingRepository: Repository<TestingEntity>,
  ) {}

  async findTest(): Promise<TestingEntity[]> {
    return this.testingRepository.find()
  }

  async findTestById(id: number): Promise<TestingEntity> {
    return this.testingRepository.createQueryBuilder('test').where('test.id = :id', { id }).getOne()
  }

  async createTest(dto: CreateTestingDto) {
    await this.testingRepository.save(dto)
  }

  async updateTest(id: number, dto: UpdateTestingDto) {
    await this.testingRepository.update(id, dto)
  }

  async updateTestStatus(id: number, status: number) {
    await this.testingRepository.update(id, { status })
  }

  async deleteTest(id: number) {
    await this.testingRepository.delete(id)
  }
}
