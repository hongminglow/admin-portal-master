import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";

import { MenuModule } from "../system/menu/menu.module";
import { ParamConfigModule } from "../system/param-config/param-config.module";
import { RoleModule } from "../system/role/role.module";

import { UserController } from "./user.controller";
import { CqrsUserController } from "./cqrs-user.controller";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

// CQRS Handlers
import { CreateUserHandler } from "./commands/create-user.handler";
import { GetUserByIdHandler } from "./queries/get-user-by-id.handler";
import { UserCreatedHandler } from "./events/user-created.handler";

const providers = [UserService];

// CQRS Components
const commandHandlers = [CreateUserHandler];
const queryHandlers = [GetUserByIdHandler];
const eventHandlers = [UserCreatedHandler];

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		CqrsModule, // Add CQRS module
		RoleModule,
		MenuModule,
		ParamConfigModule,
	],
	controllers: [
		UserController,
		CqrsUserController, // Add CQRS controller
	],
	providers: [...providers, ...commandHandlers, ...queryHandlers, ...eventHandlers],
	exports: [TypeOrmModule, ...providers],
})
export class UserModule {}
