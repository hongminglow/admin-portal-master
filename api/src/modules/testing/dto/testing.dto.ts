import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsIn, IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateTestingDto {
  @ApiProperty({ description: '昵称', example: 'admin123' })
  @MinLength(1)
  @MaxLength(30)
  @IsString()
  nickname: string

  @ApiProperty({ description: '年龄', example: 18 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  age: number

  @ApiProperty({ description: '地址', example: '中国北京市', required: false })
  @MaxLength(100)
  @IsString()
  @IsOptional()
  address: string

  @ApiProperty({ description: '邮箱', example: 'admin@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ description: '用户手机号', example: '0 | 1', required: false, default: 0 })
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  @IsOptional()
  status: number = 0
}

export class UpdateTestingDto extends PartialType(CreateTestingDto) {}

export class UpdateTestingStatusDto {
  @ApiProperty({ description: '更新状态', example: '0 | 1' })
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status: number
}
