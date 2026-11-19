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

export interface Donation {
  amount: number;
  name: string;
  message: string;
  locale: "en" | "id";
}

export interface Store {
  order(orderId: string): { amount: number; status: string } | null;
  status(orderId: string): string | null;
  hasEvent(eventId: string): boolean;
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
  now?: () => number;
  log?: Pick<Console, "info" | "error">;
}

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
export function createLimiter(now?: () => number): (ip: string) => boolean;
export function createHandler(
  deps: HandlerDeps,
): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
