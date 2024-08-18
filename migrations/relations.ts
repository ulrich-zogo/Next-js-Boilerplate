import { relations } from 'drizzle-orm/relations';

import { invoices, orders } from './schema';

export const invoicesRelations = relations(invoices, ({ one }) => ({
  order: one(orders, {
    fields: [invoices.orderId],
    references: [orders.id],
  }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  invoices: many(invoices),
}));
