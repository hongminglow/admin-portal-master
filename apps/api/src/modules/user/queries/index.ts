// Queries represent actions that read data
export class GetUserByIdQuery {
	constructor(public readonly userId: number) {}
}

export class GetUserByUsernameQuery {
	constructor(public readonly username: string) {}
}

export class GetUsersQuery {
	constructor(
		public readonly filters: {
			page?: number;
			limit?: number;
			keyword?: string;
			deptId?: number;
			status?: number;
		}
	) {}
}

export class GetUserPermissionsQuery {
	constructor(public readonly userId: number) {}
}

export class ValidateUserCredentialsQuery {
	constructor(
		public readonly username: string,
		public readonly password: string
	) {}
}
