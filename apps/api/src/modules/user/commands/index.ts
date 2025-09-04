// Commands represent actions that change state
export class CreateUserCommand {
	constructor(
		public readonly userData: {
			username: string;
			password: string;
			email?: string;
			nickname?: string;
			roleIds?: number[];
			deptId?: number;
		}
	) {}
}

export class UpdateUserPasswordCommand {
	constructor(
		public readonly userId: number,
		public readonly oldPassword: string,
		public readonly newPassword: string
	) {}
}

export class UpdateUserProfileCommand {
	constructor(
		public readonly userId: number,
		public readonly profileData: {
			nickname?: string;
			avatar?: string;
			email?: string;
			phone?: string;
			qq?: string;
			remark?: string;
		}
	) {}
}

export class DeactivateUserCommand {
	constructor(public readonly userId: number) {}
}
