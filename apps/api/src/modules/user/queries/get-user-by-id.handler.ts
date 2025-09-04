import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetUserByIdQuery } from "../queries";
import { UserEntity } from "../user.entity";

/**
 * Query Handler for getting a user by ID
 * This handler is responsible for:
 * 1. Retrieving user data from the database
 * 2. Including related entities if needed
 * 3. Returning the user data
 */
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async execute(query: GetUserByIdQuery): Promise<UserEntity | null> {
		const { userId } = query;

		return this.userRepository
			.createQueryBuilder("user")
			.where("user.id = :id", { id: userId })
			.leftJoinAndSelect("user.roles", "roles")
			.leftJoinAndSelect("user.dept", "dept")
			.getOne();
	}
}
