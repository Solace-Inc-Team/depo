ALTER TABLE "tenants" ADD COLUMN "mp_assinatura_id" text;--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "mp_assinatura_cobradas" integer DEFAULT 0 NOT NULL;