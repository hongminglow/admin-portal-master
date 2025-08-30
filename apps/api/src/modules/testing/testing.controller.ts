import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { CreateTestingDto, UpdateTestingDto, UpdateTestingStatusDto } from './dto/testing.dto'
import { TestingService } from './testing.service'

@ApiTags('Testing - API 测试')
@Controller('test')
export class TestingController {
  constructor(private testingService: TestingService) {}

  @Get()
  @ApiOperation({ summary: '获取测试数据' })
  @ApiResponse({ status: '2XX', description: '获取成功' })
  async findAll() {
    return this.testingService.findTest()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个测试数据' })
  @ApiResponse({ status: '2XX', description: '获取成功' })
  async findById(@IdParam() id: number) {
    return this.testingService.findTestById(id)
  }

  @Post()
  @ApiOperation({ summary: '创建测试数据' })
  @ApiResponse({ status: '2XX', description: '创建成功' })
  async create(@Body() body: CreateTestingDto) {
    return this.testingService.createTest(body)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新测试数据' })
  @ApiResponse({ status: '2XX', description: '更新成功' })
  async update(@IdParam() id: number, @Body() body: UpdateTestingDto) {
    return this.testingService.updateTest(id, body)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新测试状态' })
  @ApiResponse({ status: '2XX', description: '更新成功' })
  async updateStatus(@IdParam() id: number, @Body() body: UpdateTestingStatusDto) {
    return this.testingService.updateTestStatus(id, body.status)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除测试数据' })
  @ApiResponse({ status: '2XX', description: '删除成功' })
  async delete(@IdParam() id: number) {
    return this.testingService.deleteTest(id)
  }
}
