import { Status } from "../models/Status";

export function formatStatus(status: Status): string {
  return `Status ${status.statusCode}: ${status.statusMessage}`;
}