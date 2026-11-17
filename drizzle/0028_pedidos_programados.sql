CREATE TABLE "pedidos_programados" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"a_cada_dias" integer NOT NULL,
	"proxima" date NOT NULL,
	"itens" jsonb NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"address" text,
	"reference" text DEFAULT '' NOT NULL,
	"delivery_fee_cents" integer DEFAULT 0 NOT NULL,
	"pausado" boolean DEFAULT false NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pedidos_programados" ADD CONSTRAINT "pedidos_programados_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedidos_programados" ADD CONSTRAINT "pedidos_programados_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedidos_programados" ADD CONSTRAINT "pedidos_programados_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedidos_programados" ADD CONSTRAINT "pedidos_programados_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "pedidos_programados_dia_idx" ON "pedidos_programados" USING btree ("tenant_id","proxima");--> statement-breakpoint
CREATE INDEX "pedidos_programados_cliente_idx" ON "pedidos_programados" USING btree ("customer_id");--> statement-breakpoint
ALTER TABLE "pedidos_programados" ENABLE ROW LEVEL SECURITY;
