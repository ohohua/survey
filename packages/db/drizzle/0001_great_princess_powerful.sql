CREATE TABLE `answer` (
	`id` varchar(10) NOT NULL,
	`user_id` varchar(10) NOT NULL,
	`question_id` varchar(10) NOT NULL,
	`component_id` varchar(10) NOT NULL,
	`content` varchar(255),
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `answer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `options` (
	`id` varchar(10) NOT NULL,
	`question_id` varchar(10) NOT NULL,
	`component_id` varchar(10) NOT NULL,
	`option` varchar(255),
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `options_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` ADD `username` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `password` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_username_unique` UNIQUE(`username`);--> statement-breakpoint
ALTER TABLE `component` DROP COLUMN `answer`;