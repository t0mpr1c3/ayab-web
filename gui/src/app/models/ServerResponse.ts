import { AccessToken } from "./AccessToken";
import { Status } from "./Status";

export interface ServerResponse extends Status, AccessToken {}