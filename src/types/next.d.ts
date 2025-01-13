import { IncomingHttpHeaders } from "http";

declare module 'next' {
    interface NextApiRequest {
        user?: {
            uuid: string;
            email: string;
            headers: IncomingHttpHeaders;
        };

    }
}