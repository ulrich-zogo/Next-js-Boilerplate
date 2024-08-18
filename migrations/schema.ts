import {
  bigint,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

export const aal_level = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const code_challenge_method = pgEnum('code_challenge_method', [
  's256',
  'plain',
]);
export const factor_status = pgEnum('factor_status', [
  'unverified',
  'verified',
]);
export const factor_type = pgEnum('factor_type', ['totp', 'webauthn']);
export const one_time_token_type = pgEnum('one_time_token_type', [
  'confirmation_token',
  'reauthentication_token',
  'recovery_token',
  'email_change_token_new',
  'email_change_token_current',
  'phone_change_token',
]);
export const key_status = pgEnum('key_status', [
  'default',
  'valid',
  'invalid',
  'expired',
]);
export const key_type = pgEnum('key_type', [
  'aead-ietf',
  'aead-det',
  'hmacsha512',
  'hmacsha256',
  'auth',
  'shorthash',
  'generichash',
  'kdf',
  'secretbox',
  'secretstream',
  'stream_xchacha20',
]);
export const action = pgEnum('action', [
  'INSERT',
  'UPDATE',
  'DELETE',
  'TRUNCATE',
  'ERROR',
]);
export const equality_op = pgEnum('equality_op', [
  'eq',
  'neq',
  'lt',
  'lte',
  'gt',
  'gte',
  'in',
]);

export const orders = pgTable('orders', {
  id: text('id').primaryKey().notNull(),
  customerId: text('customerId').notNull(),
  orderDate: timestamp('orderDate', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  totalAmount: numeric('totalAmount').notNull(),
});

export const invoices = pgTable(
  'invoices',
  {
    id: text('id').primaryKey().notNull(),
    orderId: text('orderId')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    invoiceDate: timestamp('invoiceDate', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    totalAmount: numeric('totalAmount').notNull(),
  },
  (table) => {
    return {
      invoices_orderId_unique: unique('invoices_orderId_unique').on(
        table.orderId,
      ),
    };
  },
);

export const client = pgTable('client', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: 'public.client_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
  created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
});

export const agent = pgTable('agent', {
  id: integer('id').primaryKey().notNull(),
  name: varchar('name', { length: 20 }),
  age: varchar('age', { length: 20 }),
});
