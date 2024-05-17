/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PostBanUserOrToken200Response
 */
export interface PostBanUserOrToken200Response {
    /**
     * 
     * @type {boolean}
     * @memberof PostBanUserOrToken200Response
     */
    success: boolean;
    /**
     * Latest ban expiration datetime in ISO format, null for no ban
     * @type {Date}
     * @memberof PostBanUserOrToken200Response
     */
    result: Date | null;
    /**
     * Error message if success is false, otherwise undefined, compatible with response error
     * @type {string}
     * @memberof PostBanUserOrToken200Response
     */
    message: string;
}

/**
 * Check if a given object implements the PostBanUserOrToken200Response interface.
 */
export function instanceOfPostBanUserOrToken200Response(value: object): boolean {
    if (!('success' in value)) return false;
    if (!('result' in value)) return false;
    if (!('message' in value)) return false;
    return true;
}

export function PostBanUserOrToken200ResponseFromJSON(json: any): PostBanUserOrToken200Response {
    return PostBanUserOrToken200ResponseFromJSONTyped(json, false);
}

export function PostBanUserOrToken200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostBanUserOrToken200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'success': json['success'],
        'result': (json['result'] == null ? null : new Date(json['result'])),
        'message': json['message'],
    };
}

export function PostBanUserOrToken200ResponseToJSON(value?: PostBanUserOrToken200Response | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'success': value['success'],
        'result': (value['result'] == null ? null : (value['result'] as any).toISOString()),
        'message': value['message'],
    };
}

