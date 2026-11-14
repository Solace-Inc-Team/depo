CREATE TABLE "avisos_pedido" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"endpoint" text NOT NULL,
	"p256dh" text NOT NULL,
	"auth" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "avisos_pedido" ADD CONSTRAINT "avisos_pedido_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "avisos_pedido" ADD CONSTRAINT "avisos_pedido_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "avisos_pedido_endpoint_uq" ON "avisos_pedido" USING btree ("order_id","endpoint");--> statement-breakpoint
ALTER TABLE "avisos_pedido" ENABLE ROW LEVEL SECURITY;
