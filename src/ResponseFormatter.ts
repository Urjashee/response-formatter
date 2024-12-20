import { Response } from 'express';

export class ResponseFormatter {
    /**
     * Sends a success response.
     * @param res - Express Response object
     * @param message - Message describing the operation's success
     * @param data - Optional data payload
     */
    static successResponse(
        res: Response,
        message: string = 'Operation completed successfully.',
        data: any = null
    ): Response {
        const response = {
            status: 'OK',
            message,
            ...(data && { data: this.createDataKeyValueIfRequired(data) }),
        };
        return res.status(200).json(response);
    }

    /**
     * Sends an error response.
     * @param res - Express Response object
     * @param message - Message describing the error
     * @param data - Optional data payload
     */
    static errorResponse(
        res: Response,
        message: string = 'Failed to complete the operation!',
        data: any = null
    ): Response {
        const response = {
            status: 'ERROR',
            message,
            ...(data && { data: this.createDataKeyValueIfRequired(data) }),
        };
        return res.status(400).json(response);
    }

    /**
     * Sends an unauthorized response.
     * @param res - Express Response object
     * @param message - Message describing unauthorized access
     * @param data - Optional data payload
     */
    static unauthorizedResponse(
        res: Response,
        message: string = 'You are not authorized to access this resource!',
        data: any = null
    ): Response {
        const response = {
            status: 'UNAUTHORIZED',
            message,
            ...(data && { data: this.createDataKeyValueIfRequired(data) }),
        };
        return res.status(401).json(response);
    }

    /**
     * Sends a forbidden response.
     * @param res - Express Response object
     * @param message - Message describing forbidden access
     * @param data - Optional data payload
     */
    static forbiddenResponse(
        res: Response,
        message: string = 'You are not allowed to access this resource!',
        data: any = null
    ): Response {
        const response = {
            status: 'FORBIDDEN',
            message,
            ...(data && { data: this.createDataKeyValueIfRequired(data) }),
        };
        return res.status(403).json(response);
    }

    /**
     * Helper method to process data.
     * If data is a non-object or non-array, wraps it in an object with a "value" key.
     * @param data - The data payload
     */
    private static createDataKeyValueIfRequired(data: any): any {
        if (Array.isArray(data) || (data && typeof data === 'object')) {
            return data;
        }
        return data ? { value: data } : null;
    }
}
