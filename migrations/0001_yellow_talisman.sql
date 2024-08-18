CREATE TABLE IF NOT EXISTS "invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text NOT NULL,
	"invoiceDate" timestamp with time zone NOT NULL,
	"totalAmount" numeric NOT NULL,
	CONSTRAINT "invoices_orderId_unique" UNIQUE("orderId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"customerId" text NOT NULL,
	"orderDate" timestamp with time zone NOT NULL,
	"totalAmount" numeric NOT NULL
);
--> statement-breakpoint
DROP TABLE "guestbook";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
