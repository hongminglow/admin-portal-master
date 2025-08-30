// ==========================================
// PIPE EXAMPLES FOR TESTING MODULE
// ==========================================

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  PipeTransform,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateTestingDto } from '../dto/testing.dto'

// ==========================================
// CUSTOM PIPE DEFINITION (Must be defined first)
// ==========================================

@Injectable()
export class StatusValidationPipe implements PipeTransform {
  transform(value: any) {
    // Convert to number
    const val = Number.parseInt(value, 10)

    // Validate it's 0 or 1 only
    if (Number.isNaN(val) || ![0, 1].includes(val)) {
      throw new BadRequestException('Status must be 0 or 1')
    }

    return val
  }
}

@Controller('testing-examples')
export class PipeExamplesController {
  // ==========================================
  // 1. BUILT-IN VALIDATION PIPE (Most Common)
  // ==========================================

  @Post('with-validation')
  // This automatically validates CreateTestingDto
  async createWithValidation(@Body() body: CreateTestingDto) {
    // If body doesn't match DTO rules, pipe throws error BEFORE this runs
    // body.email is guaranteed to be valid email
    // body.age is guaranteed to be positive number
    return { message: 'Valid data received', data: body }
  }

  // ==========================================
  // 2. TRANSFORM PIPES (Convert types)
  // ==========================================

  @Get('user/:id')
  async getUser(
    // ParseIntPipe converts string "123" to number 123
    @Param('id', ParseIntPipe) id: number,
  ) {
    // id is guaranteed to be a number, not string
    console.log(typeof id) // "number"
    return { userId: id }
  }

  // ==========================================
  // 3. MULTIPLE PIPES CHAIN
  // ==========================================

  @Post('advanced/:id')
  async advancedExample(
    @Param('id', ParseIntPipe) id: number, // Transform string → number
    @Body() body: CreateTestingDto, // Validate entire object
  ) {
    return {
      message: `User ${id} data updated`,
      data: body,
    }
  }

  // ==========================================
  // 4. PIPE WITH CUSTOM OPTIONS
  // ==========================================

  @Post('strict-validation')
  @UsePipes(new ValidationPipe({
    whitelist: true, // Remove properties not in DTO
    forbidNonWhitelisted: true, // Throw error for extra properties
    transform: true, // Auto-transform types
  }))
  async strictValidation(@Body() body: CreateTestingDto) {
    return body
  }

  // ==========================================
  // 5. CUSTOM PIPE EXAMPLE
  // ==========================================

  @Get('status/:status')
  async getByStatus(
    @Param('status', StatusValidationPipe) status: number,
  ) {
    return { status }
  }
}

// ==========================================
// CUSTOM PIPE DEFINITION
// ==========================================

// (Already defined above)

// ==========================================
// REACT DEVELOPER MENTAL MODEL
// ==========================================

/*
THINK OF IT LIKE THIS:

React form validation:
const MyForm = () => {
  const [errors, setErrors] = useState({})

  const handleSubmit = (data) => {
    const newErrors = validateData(data)  // Manual validation
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    // Process valid data
    submitToAPI(data)
  }
}

NestJS with pipes:
@Post()
async create(@Body() data: CreateTestingDto) {  // Automatic validation
  // If we reach here, data is 100% valid
  // No need to check errors - pipe already did it
  return this.service.create(data)
}

PIPES = AUTOMATIC FORM VALIDATION + TYPE CONVERSION
*/

// ==========================================
// COMMON BUILT-IN PIPES
// ==========================================

/*
ParseIntPipe     - "123" → 123
ParseFloatPipe   - "12.5" → 12.5
ParseBoolPipe    - "true" → true
ParseUUIDPipe    - validates UUID format
ValidationPipe   - validates DTOs with decorators
*/

// ==========================================
// ERROR HANDLING WITH PIPES
// ==========================================

/*
If pipe validation fails:
- Client gets HTTP 400 Bad Request
- Response includes validation error details
- Your controller method never runs

Example error response:
{
  "statusCode": 400,
  "message": [
    "age must be a positive number",
    "email must be an email"
  ],
  "error": "Bad Request"
}
*/
