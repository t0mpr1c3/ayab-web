import { Status } from "../../../../../shared/src/models/status.model";
import { AccessToken } from "./access-token.model";

export interface ServerResponse extends Status, AccessToken {}