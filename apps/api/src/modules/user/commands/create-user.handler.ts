import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { BusinessException } from "~/common/exceptions/biz.exception";
import { ErrorEnum } from "~/constants/error-code.constant";
import { md5, randomValue } from "~/utils";
import { CreateUserCommand } from "../commands";
import { UserCreatedEvent } from "../events";
import { UserEntity } from "../user.entity";
import { RoleEntity } from "../../system/role/role.entity";

/**
 * Command Handler for creating a new user
 * This handler is responsible for:
 * 1. Validating the user data
 * 2. Creating the user in the database
 * 3. Publishing events for other parts of the system
 */
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(RoleEntity)
		private readonly roleRepository: Repository<RoleEntity>,
		private readonly eventBus: EventBus
	) {}

	async execute(command: CreateUserCommand): Promise<UserEntity> {
		const { userData } = command;

		// 1. Validate - Check if username already exists
		const existingUser = await this.userRepository.findOneBy({
			username: userData.username,
		});

		if (existingUser) {
			throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS);
		}

		// 2. Prepare user data
		const salt = randomValue(32);
		const hashedPassword = md5(`${userData.password}${salt}`);

		// 3. Handle roles if provided
		let roles: RoleEntity[] = [];
		if (userData.roleIds && userData.roleIds.length > 0) {
			roles = await this.roleRepository.findBy({
				id: In(userData.roleIds),
			});
		}

		// 4. Create user entity
		const user = this.userRepository.create({
			username: userData.username,
			password: hashedPassword,
			psalt: salt,
			email: userData.email,
			nickname: userData.nickname || userData.username,
			roles,
			status: 1, // Active by default
		});

		// Set department if provided
		if (userData.deptId) {
			user.dept = { id: userData.deptId } as any;
		}

		// 5. Save to database
		const savedUser = await this.userRepository.save(user);

		// 6. Publish event for other parts of the system (email, audit, etc.)
		await this.eventBus.publish(
			new UserCreatedEvent(savedUser.id, {
				username: savedUser.username,
				email: savedUser.email,
				nickname: savedUser.nickname,
			})
		);

		return savedUser;
	}
}
