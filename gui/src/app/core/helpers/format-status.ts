import { Status } from "../../../../../shared/src/models/status.model";

export function formatStatus(status: Status): string {
  return `Status ${status.statusCode}: ${status.statusMessage}`;
}