CREATE TABLE `component` (
	`id` varchar(10) NOT NULL,
	`question_id` varchar(10) NOT NULL,
	`type` varchar(64),
	`sort` int NOT NULL,
	`props` json DEFAULT ('{}'),
	`answer` json DEFAULT ('{}'),
	`is_deleted` boolean DEFAULT false,
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `component_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question` (
	`id` varchar(10) NOT NULL,
	`title` varchar(255) NOT NULL,
	`background_image` varchar(255),
	`page_header_image` varchar(255),
	`is_published` boolean DEFAULT false,
	`is_star` boolean DEFAULT false,
	`answer_count` int DEFAULT 0,
	`is_deleted` boolean DEFAULT false,
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `question_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(10) NOT NULL,
	`name` varchar(64) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(64) NOT NULL,
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
