// Types for server.mjs, used by tests/unit/donate-server.test.ts (the service itself runs as plain JavaScript).
import type { IncomingMessage, ServerResponse } from "node:http";

export const SITE: string;
export const PRESETS: number[];
export const MIN_AMOUNT: number;
export const MAX_AMOUNT: number;
export const NAME_MAX: number;
export const MESSAGE_MAX: number;
export const ORDER_ID_PATTERN: RegExp;
export const CHECKOUT_PREFIXES: string[];
export const FEE_PER_MILLE: number;
export const FEE_FIXED: number;
export const SUPPORTERS_LIMIT: number;
export const SUPPORTERS_CACHE_MS: number;

/** One paid donation as shown on /support: what the donor typed, or null when they left it empty. */
export interface Supporter {
  name: string | null;
  message: string | null;
  /** YYYY-MM-DD the payment completed (UTC). */
  date: string;
}

export interface StoredOrder {
  /** What the donor chose and the owner nets. */
  amount: number;
  /** What Sumopod charged (amount plus its fee); optional in older test fixtures. */
  charged?: number;
  status: string;
  name: string;
  message: string;
  paidAt: string | null;
}

export interface Donation {
  amount: number;
  name: string;
  message: string;
  locale: "en" | "id";
}

export interface Store {
  order(
    orderId: string,
  ): { amount: number; charged: number; status: string } | null;
  status(orderId: string): string | null;
  hasEvent(eventId: string): boolean;
  supporters(limit: number): Supporter[];
  record(entry: Record<string, unknown>): void;
}

export interface HandlerDeps {
  apiKey: string;
  webhookSecret?: string;
  webhookToken?: string;
  baseUrl: string;
  store: Store;
  fetch: typeof globalThis.fetch;
  limiter: (ip: string) => boolean;
  /** Per-IP limit for GET /api/donate/supporters; defaults to 20 per minute. */
  supportersLimiter?: (ip: string) => boolean;
  now?: () => number;
  log?: Pick<Console, "info" | "error">;
}

export function serviceFee(charged: number): number;
export function grossUp(amount: number): number;
export function validateAmount(value: unknown): number | null;
export function cleanText(value: unknown, max: number): string | null;
export function parseDonation(body: unknown): Donation | { error: string };
export function createOrderId(now?: number, bytes?: Uint8Array): string;
export function verifySvix(
  secret: string | undefined,
  headers: Record<string, string | string[] | undefined>,
  rawBody: Buffer | string,
  nowSeconds?: number,
): boolean;
export function verifyToken(
  token: string | undefined,
  header: string | undefined,
): boolean;
export function createStore(file?: string): Store;
export function publicSupporters(
  orders: Iterable<StoredOrder>,
  limit?: number,
): Supporter[];
export function createLimiter(
  now?: () => number,
  options?: { perMinute?: number; globalPerMinute?: number },
): (ip: string) => boolean;
export function createHandler(
  deps: HandlerDeps,
): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
