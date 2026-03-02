CREATE TABLE `customers` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`cpf` varchar(11) NOT NULL,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`)
);
