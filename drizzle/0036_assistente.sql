CREATE TABLE "assistente_uso" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"nivel" text NOT NULL,
	"tokens_entrada" integer NOT NULL,
	"tokens_cache" integer NOT NULL,
	"tokens_saida" integer NOT NULL,
	"custo_micro" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assistente_uso" ADD CONSTRAINT "assistente_uso_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assistente_uso" ADD CONSTRAINT "assistente_uso_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assistente_uso_dia_idx" ON "assistente_uso" USING btree ("tenant_id","created_at");--> statement-breakpoint
ALTER TABLE "assistente_uso" ENABLE ROW LEVEL SECURITY;