import { ZodError } from "zod";

export class HttpAPIError extends Error {
    name: string;

    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ResponseStatusError extends HttpAPIError {
    status: number;

    constructor(status: number, message?: string) {
        super(message);
        this.status = status;
    }
}

export class ContentTypeError extends HttpAPIError {
    contentType: string;

    constructor(contentType: string, message?: string) {
        super(message);
        this.contentType = contentType;
    }
}

export class SchemaError extends HttpAPIError {
    zodError: ZodError;

    constructor(zodError: ZodError, message?: string) {
        super(message);
        this.zodError = zodError;
    }
}

// Add more error classes if you need distinction