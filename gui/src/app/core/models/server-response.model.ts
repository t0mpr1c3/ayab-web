import { AccessToken } from "./access-token.model";
import { Status } from "./status.model";

export interface ServerResponse extends Status, AccessToken {}