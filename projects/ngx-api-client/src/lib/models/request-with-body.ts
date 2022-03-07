import { Request } from "./request";

export interface RequestWithBody extends Request {
    body?: any;
}