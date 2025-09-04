import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserCommand } from "./commands";
import { GetUserByIdQuery } from "./queries";
import { UserEntity } from "./user.entity";

/**
 * CQRS-based User Controller
 *
 * Notice how clean and focused this controller is:
 * - No business logic
 * - Just dispatches commands and queries
 * - Each endpoint has a single responsibility
 */
@ApiTags("CQRS Users Demo")
@Controller("cqrs-users")
export class CqrsUserController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	/**
	 * Create a new user using CQRS Command
	 */
	@Post()
	@ApiOperation({ summary: "Create user with CQRS pattern" })
	async createUser(
		@Body()
		userData: {
			username: string;
			password: string;
			email?: string;
			nickname?: string;
			roleIds?: number[];
			deptId?: number;
		}
	): Promise<UserEntity> {
		// Just dispatch the command - no business logic here
		return this.commandBus.execute(new CreateUserCommand(userData));
	}

	/**
	 * Get user by ID using CQRS Query
	 */
	@Get(":id")
	@ApiOperation({ summary: "Get user by ID with CQRS pattern" })
	async getUserById(@Param("id") id: string): Promise<UserEntity | null> {
		// Just dispatch the query - no business logic here
		return this.queryBus.execute(new GetUserByIdQuery(parseInt(id)));
	}
}

/**
 * Compare this to a traditional controller:
 *
 * @Controller('traditional-users')
 * export class TraditionalUserController {
 *   constructor(private readonly userService: UserService) {}
 *
 *   @Post()
 *   async createUser(@Body() userData: CreateUserDto) {
 *     // All logic mixed in the service
 *     return this.userService.createUser(userData);
 *   }
 *
 *   @Get(':id')
 *   async getUserById(@Param('id') id: string) {
 *     return this.userService.findById(parseInt(id));
 *   }
 * }
 *
 * The CQRS approach provides:
 * 1. Better separation of concerns
 * 2. Easier testing (mock commands/queries vs entire services)
 * 3. Better scalability (can optimize reads vs writes separately)
 * 4. Event-driven architecture for side effects
 * 5. Single responsibility principle for each handler
 */
