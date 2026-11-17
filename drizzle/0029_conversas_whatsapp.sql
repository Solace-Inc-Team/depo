CREATE TABLE "conversas_whatsapp" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"telefone" text NOT NULL,
	"estado" jsonb,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "conversas_whatsapp" ADD CONSTRAINT "conversas_whatsapp_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "conversas_whatsapp_tel_uq" ON "conversas_whatsapp" USING btree ("tenant_id","telefone");--> statement-breakpoint
ALTER TABLE "conversas_whatsapp" ENABLE ROW LEVEL SECURITY;