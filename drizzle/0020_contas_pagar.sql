CREATE TABLE "contas_pagar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"supplier_id" uuid,
	"amount_cents" integer NOT NULL,
	"due_on" date NOT NULL,
	"paid_at" timestamp with time zone,
	"expense_id" uuid,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"voided_at" timestamp with time zone,
	"voided_by" uuid,
	"void_reason" text
);
--> statement-breakpoint
ALTER TABLE "contas_pagar" ADD CONSTRAINT "contas_pagar_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contas_pagar" ADD CONSTRAINT "contas_pagar_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contas_pagar" ADD CONSTRAINT "contas_pagar_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contas_pagar" ADD CONSTRAINT "contas_pagar_expense_id_expenses_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expenses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contas_pagar" ADD CONSTRAINT "contas_pagar_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contas_pagar" ADD CONSTRAINT "contas_pagar_voided_by_users_id_fk" FOREIGN KEY ("voided_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "contas_pagar_tenant_due_idx" ON "contas_pagar" USING btree ("tenant_id","due_on");--> statement-breakpoint
ALTER TABLE "contas_pagar" ENABLE ROW LEVEL SECURITY;
