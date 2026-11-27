ALTER TABLE "orders" ADD COLUMN "chave_envio" text;--> statement-breakpoint
CREATE UNIQUE INDEX "orders_tenant_chave_envio_uq" ON "orders" USING btree ("tenant_id","chave_envio");