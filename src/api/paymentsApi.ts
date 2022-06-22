/**
 * New Payment Gateway APIs
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2022-01-01
 * Contact: nextgenapi@cashfree.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import localVarRequest from 'request';
import http from 'http';

/* tslint:disable:no-unused-locals */
import { CFError } from '../model/cFError';
import { CFPaymentsEntity } from '../model/cFPaymentsEntity';

import { ObjectSerializer, Authentication, VoidAuth, Interceptor } from '../model/models';

import { HttpError, RequestFile } from './apis';

let defaultBasePath = 'https://sandbox.cashfree.com/pg';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum PaymentsApiApiKeys {
}

export class PaymentsApi {
    protected _basePath = defaultBasePath;
    protected _defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    protected interceptors: Interceptor[] = [];

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    set defaultHeaders(defaultHeaders: any) {
        this._defaultHeaders = defaultHeaders;
    }

    get defaultHeaders() {
        return this._defaultHeaders;
    }

    get basePath() {
        return this._basePath;
    }

    public setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    public setApiKey(key: PaymentsApiApiKeys, value: string) {
        (this.authentications as any)[PaymentsApiApiKeys[key]].apiKey = value;
    }

    public addInterceptor(interceptor: Interceptor) {
        this.interceptors.push(interceptor);
    }

    /**
     * Use this API to view payment details of an order for a payment ID.
     * @summary Get Payment by ID
     * @param xClientId 
     * @param xClientSecret 
     * @param orderId 
     * @param cfPaymentId 
     * @param xApiVersion 
     * @param xIdempotencyReplayed 
     * @param xIdempotencyKey 
     * @param xRequestId 
     */
    public async getPaymentbyId (xClientId: string, xClientSecret: string, orderId: string, cfPaymentId: number, xApiVersion?: string, xIdempotencyReplayed?: boolean, xIdempotencyKey?: string, xRequestId?: string, requestTimeout?: Number, webProxy?: any,options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ cfHeaders: http.IncomingHttpHeaders; cfPaymentsEntity: CFPaymentsEntity;  }> {
        const localVarPath = this.basePath + '/orders/{order_id}/payments/{cf_payment_id}'
            .replace('{' + 'order_id' + '}', encodeURIComponent(String(orderId)))
            .replace('{' + 'cf_payment_id' + '}', encodeURIComponent(String(cfPaymentId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this._defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'xClientId' is not null or undefined
        if (xClientId === null || xClientId === undefined) {
            throw new Error('Required parameter xClientId was null or undefined when calling getPaymentbyId.');
        }

        // verify required parameter 'xClientSecret' is not null or undefined
        if (xClientSecret === null || xClientSecret === undefined) {
            throw new Error('Required parameter xClientSecret was null or undefined when calling getPaymentbyId.');
        }

        // verify required parameter 'orderId' is not null or undefined
        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling getPaymentbyId.');
        }

        // verify required parameter 'cfPaymentId' is not null or undefined
        if (cfPaymentId === null || cfPaymentId === undefined) {
            throw new Error('Required parameter cfPaymentId was null or undefined when calling getPaymentbyId.');
        }

        localVarHeaderParams['x-client-id'] = ObjectSerializer.serialize(xClientId, "string");
        localVarHeaderParams['x-client-secret'] = ObjectSerializer.serialize(xClientSecret, "string");
        localVarHeaderParams['x-api-version'] = ObjectSerializer.serialize(xApiVersion, "string");
        localVarHeaderParams['x-idempotency-replayed'] = ObjectSerializer.serialize(xIdempotencyReplayed, "boolean");
        localVarHeaderParams['x-idempotency-key'] = ObjectSerializer.serialize(xIdempotencyKey, "string");
        localVarHeaderParams['x-request-id'] = ObjectSerializer.serialize(xRequestId, "string");
        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            timeout:requestTimeout,
            ...(webProxy && {
                proxy : webProxy
            })
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ cfHeaders: http.IncomingHttpHeaders; cfPaymentsEntity: CFPaymentsEntity;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "CFPaymentsEntity");
                            resolve({ cfHeaders: response.headers, cfPaymentsEntity: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
    /**
     * Use this API to view all payment details for an order.
     * @summary Get Payments for an Order
     * @param xClientId 
     * @param xClientSecret 
     * @param orderId 
     * @param xApiVersion 
     * @param xIdempotencyReplayed 
     * @param xIdempotencyKey 
     * @param xRequestId 
     */
    public async getPaymentsfororder (xClientId: string, xClientSecret: string, orderId: string, xApiVersion?: string, xIdempotencyReplayed?: boolean, xIdempotencyKey?: string, xRequestId?: string, requestTimeout?: Number, webProxy?: any,options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ cfHeaders: http.IncomingHttpHeaders; cfPaymentsEntities: Array<CFPaymentsEntity>;  }> {
        const localVarPath = this.basePath + '/orders/{order_id}/payments'
            .replace('{' + 'order_id' + '}', encodeURIComponent(String(orderId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this._defaultHeaders);
        const produces = ['application/json'];
        // give precedence to 'application/json'
        if (produces.indexOf('application/json') >= 0) {
            localVarHeaderParams.Accept = 'application/json';
        } else {
            localVarHeaderParams.Accept = produces.join(',');
        }
        let localVarFormParams: any = {};

        // verify required parameter 'xClientId' is not null or undefined
        if (xClientId === null || xClientId === undefined) {
            throw new Error('Required parameter xClientId was null or undefined when calling getPaymentsfororder.');
        }

        // verify required parameter 'xClientSecret' is not null or undefined
        if (xClientSecret === null || xClientSecret === undefined) {
            throw new Error('Required parameter xClientSecret was null or undefined when calling getPaymentsfororder.');
        }

        // verify required parameter 'orderId' is not null or undefined
        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling getPaymentsfororder.');
        }

        localVarHeaderParams['x-client-id'] = ObjectSerializer.serialize(xClientId, "string");
        localVarHeaderParams['x-client-secret'] = ObjectSerializer.serialize(xClientSecret, "string");
        localVarHeaderParams['x-api-version'] = ObjectSerializer.serialize(xApiVersion, "string");
        localVarHeaderParams['x-idempotency-replayed'] = ObjectSerializer.serialize(xIdempotencyReplayed, "boolean");
        localVarHeaderParams['x-idempotency-key'] = ObjectSerializer.serialize(xIdempotencyKey, "string");
        localVarHeaderParams['x-request-id'] = ObjectSerializer.serialize(xRequestId, "string");
        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            timeout:requestTimeout,
            ...(webProxy && {
                proxy : webProxy
            }),
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));

        let interceptorPromise = authenticationPromise;
        for (const interceptor of this.interceptors) {
            interceptorPromise = interceptorPromise.then(() => interceptor(localVarRequestOptions));
        }

        return interceptorPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ cfHeaders: http.IncomingHttpHeaders; cfPaymentsEntities: Array<CFPaymentsEntity>;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "Array<CFPaymentsEntity>");
                            resolve({ cfHeaders: response.headers, cfPaymentsEntities: body });
                        } else {
                            reject(new HttpError(response, body, response.statusCode));
                        }
                    }
                });
            });
        });
    }
}
