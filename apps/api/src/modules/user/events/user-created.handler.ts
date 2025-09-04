import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { UserCreatedEvent } from "../events";

/**
 * Event Handler for when a user is created
 * This handler can be responsible for:
 * 1. Sending welcome emails
 * 2. Creating audit logs
 * 3. Triggering notifications
 * 4. Setting up default preferences
 *
 * The beauty of event handlers is they run independently and can be async
 * They don't block the main command execution
 */
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
	private readonly logger = new Logger(UserCreatedHandler.name);

	constructor() // Inject services you need here
	// private readonly emailService: EmailService,
	// private readonly auditService: AuditService,
	// private readonly notificationService: NotificationService,
	{}

	async handle(event: UserCreatedEvent) {
		this.logger.log(`Handling UserCreatedEvent for user ${event.userId}`);

		try {
			// Example: Send welcome email
			// await this.emailService.sendWelcomeEmail(event.userData.email);

			// Example: Create audit log
			// await this.auditService.log('USER_CREATED', {
			//   userId: event.userId,
			//   username: event.userData.username,
			//   timestamp: new Date(),
			// });

			// Example: Send notification to admins
			// await this.notificationService.notifyAdmins('New user registered', {
			//   username: event.userData.username,
			//   userId: event.userId,
			// });

			this.logger.log(`Successfully processed UserCreatedEvent for user ${event.userId}`);
		} catch (error) {
			this.logger.error(`Failed to process UserCreatedEvent for user ${event.userId}`, error);
			// Note: In event handlers, you might want to implement retry logic
			// or push failed events to a dead letter queue
		}
	}
}
