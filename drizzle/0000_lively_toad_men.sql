CREATE TABLE `event_sections` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`is_published` boolean NOT NULL DEFAULT false,
	`total_spots` int NOT NULL DEFAULT 0,
	`total_spots_reserved` int NOT NULL DEFAULT 0,
	`price` decimal(10,2) NOT NULL,
	`event_id` varchar(36) NOT NULL,
	CONSTRAINT `event_sections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event_spots` (
	`id` varchar(36) NOT NULL,
	`location` varchar(255),
	`is_reserved` boolean NOT NULL DEFAULT false,
	`is_published` boolean NOT NULL DEFAULT false,
	`section_id` varchar(36) NOT NULL,
	CONSTRAINT `event_spots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`date` timestamp NOT NULL,
	`is_published` boolean NOT NULL DEFAULT false,
	`total_spots` int NOT NULL DEFAULT 0,
	`total_spots_reserved` int NOT NULL DEFAULT 0,
	`partner_id` varchar(36) NOT NULL,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `event_sections` ADD CONSTRAINT `event_sections_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event_spots` ADD CONSTRAINT `event_spots_section_id_event_sections_id_fk` FOREIGN KEY (`section_id`) REFERENCES `event_sections`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_partner_id_partners_id_fk` FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;