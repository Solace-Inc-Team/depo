ALTER TABLE "tenants" ADD COLUMN "whatsapp_numero_id" text;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_whatsapp_numero_id_unique" UNIQUE("whatsapp_numero_id");