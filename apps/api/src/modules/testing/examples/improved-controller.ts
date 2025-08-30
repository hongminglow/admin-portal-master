// ==========================================
// IMPROVED TESTING CONTROLLER WITH PROPER PIPES
// ==========================================

import { Body, Controller, Delete, Get, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import {
    CreateTestingDto,
    UpdateTestingDto,
    UpdateTestingStatusDto,
} from '../dto/testing.dto'
import { TestingService } from '../testing.service'

@ApiTags('Testing - API 测试')
@Controller('test')
// Apply ValidationPipe to entire controller
@UsePipes(new ValidationPipe({
  whitelist: true, // Remove unknown properties
  forbidNonWhitelisted: true, // Throw error for unknown properties
  transform: true, // Auto-transform types (string "18" → number 18)
}))
export class ImprovedTestingController {
  constructor(private testingService: TestingService) {}

  @Get()
  @ApiOperation({ summary: '获取测试数据' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findAll() {
    return this.testingService.findTest()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个测试数据' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findById(
    // IdParam already includes ParseIntPipe with custom error message
    @IdParam() id: number,
  ) {
    // id is guaranteed to be a valid number
    return this.testingService.findTestById(id)
  }

  @Post()
  @ApiOperation({ summary: '创建测试数据' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @ApiBody({ type: CreateTestingDto })
  async create(@Body() body: CreateTestingDto) {
    // body is automatically validated by ValidationPipe
    // If validation fails, client gets 400 error before this runs
    return this.testingService.createTest(body)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新测试数据' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiBody({ type: UpdateTestingDto })
  async update(
    @IdParam() id: number,
    @Body() body: UpdateTestingDto,
  ) {
    return this.testingService.updateTest(id, body)
  }

  @Patch(':id/status') // Better RESTful path
  @ApiOperation({ summary: '更新测试状态' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiBody({ type: UpdateTestingStatusDto })
  async updateStatus(
    @IdParam() id: number,
    @Body() body: UpdateTestingStatusDto,
  ) {
    // Both id and body.status are validated by pipes
    return this.testingService.updateTestStatus(id, body.status)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除测试数据' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async delete(@IdParam() id: number) {
    return this.testingService.deleteTest(id)
  }
}

// ==========================================
// PIPES EXPLAINED FOR REACT DEVELOPERS
// ==========================================

/*

IMAGINE PIPES AS REACT HIGHER-ORDER COMPONENTS (HOCs):

// React HOC pattern
const withValidation = (Component) => {
  return (props) => {
    if (!isValid(props)) {
      return <ErrorMessage />
    }
    return <Component {...props} />
  }
}

// NestJS Pipe pattern
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isValid(value)) {
      throw new BadRequestException()
    }
    return value
  }
}

BOTH PATTERNS:
1. Intercept data before it reaches the component/controller
2. Validate the data
3. Transform or reject it
4. Only pass valid data to the actual component/controller

PIPES = HOCs FOR API ENDPOINTS!

*/
