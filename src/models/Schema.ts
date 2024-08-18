import { createId } from '@paralleldrive/cuid2';
import { decimal, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  customerId: text('customerId').notNull(),
  orderDate: timestamp('orderDate', { withTimezone: true }).notNull(),
  totalAmount: decimal('totalAmount').notNull(),
});

export const invoices = pgTable('invoices', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  orderId: text('orderId')
    .references(() => orders.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  invoiceDate: timestamp('invoiceDate', { withTimezone: true }).notNull(),
  totalAmount: decimal('totalAmount').notNull(),
});
