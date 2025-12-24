CREATE TABLE `advocates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`degree` text NOT NULL,
	`specialties` text DEFAULT '[]' NOT NULL,
	`years_of_experience` integer NOT NULL,
	`phone_number` text NOT NULL,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE INDEX `advocates_state_idx` ON `advocates` (`state`);--> statement-breakpoint
CREATE INDEX `advocates_last_name_idx` ON `advocates` (`last_name`);