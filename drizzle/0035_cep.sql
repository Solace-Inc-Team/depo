ALTER TABLE "customer_addresses" ADD COLUMN "cep" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "cep" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "cep" text DEFAULT '' NOT NULL;