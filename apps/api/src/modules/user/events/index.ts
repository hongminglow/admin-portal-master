// Events represent things that happened as a result of commands
export class UserCreatedEvent {
	constructor(
		public readonly userId: number,
		public readonly userData: {
			username: string;
			email?: string;
			nickname?: string;
		}
	) {}
}

export class UserPasswordChangedEvent {
	constructor(
		public readonly userId: number,
		public readonly changedAt: Date
	) {}
}

export class UserProfileUpdatedEvent {
	constructor(
		public readonly userId: number,
		public readonly changes: Record<string, any>,
		public readonly updatedAt: Date
	) {}
}

export class UserDeactivatedEvent {
	constructor(
		public readonly userId: number,
		public readonly deactivatedAt: Date
	) {}
}
