ALTER TABLE "cash_entries" ADD COLUMN "trip_id" uuid;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "trip_id" uuid;--> statement-breakpoint
CREATE INDEX "orders_trip_idx" ON "orders" USING btree ("trip_id");--> statement-breakpoint
-- pedidos já na rua quando a viagem chegou: cada entregador fica com uma viagem só, para não sumirem da tela
WITH g AS (
  SELECT shift_id, driver_id, gen_random_uuid() AS trip
  FROM orders WHERE status = 'em_rota' AND shift_id IS NOT NULL AND driver_id IS NOT NULL
  GROUP BY shift_id, driver_id
)
UPDATE orders o SET trip_id = g.trip FROM g
WHERE o.status = 'em_rota' AND o.shift_id = g.shift_id AND o.driver_id = g.driver_id;
