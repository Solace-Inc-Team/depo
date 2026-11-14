CREATE TABLE "assinatura_pagamentos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"mp_payment_id" text NOT NULL,
	"codigo" text NOT NULL,
	"valor_cents" integer NOT NULL,
	"expira_em" timestamp with time zone NOT NULL,
	"pago_em" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "pago_ate" date;--> statement-breakpoint
ALTER TABLE "assinatura_pagamentos" ADD CONSTRAINT "assinatura_pagamentos_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assinatura_pagamentos_tenant_idx" ON "assinatura_pagamentos" USING btree ("tenant_id","created_at");--> statement-breakpoint
ALTER TABLE "assinatura_pagamentos" ENABLE ROW LEVEL SECURITY;