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
 * @interface PostQueryUIDByToken200Response
 */
export interface PostQueryUIDByToken200Response {
    /**
     * 
     * @type {boolean}
     * @memberof PostQueryUIDByToken200Response
     */
    success: boolean;
    /**
     * User ID, null if not found
     * @type {number}
     * @memberof PostQueryUIDByToken200Response
     */
    result: number | null;
    /**
     * Error message if success is false, otherwise undefined, compatible with response error
     * @type {string}
     * @memberof PostQueryUIDByToken200Response
     */
    message: string;
}

/**
 * Check if a given object implements the PostQueryUIDByToken200Response interface.
 */
export function instanceOfPostQueryUIDByToken200Response(value: object): boolean {
    if (!('success' in value)) return false;
    if (!('result' in value)) return false;
    if (!('message' in value)) return false;
    return true;
}

export function PostQueryUIDByToken200ResponseFromJSON(json: any): PostQueryUIDByToken200Response {
    return PostQueryUIDByToken200ResponseFromJSONTyped(json, false);
}

export function PostQueryUIDByToken200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostQueryUIDByToken200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'success': json['success'],
        'result': json['result'],
        'message': json['message'],
    };
}

export function PostQueryUIDByToken200ResponseToJSON(value?: PostQueryUIDByToken200Response | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'success': value['success'],
        'result': value['result'],
        'message': value['message'],
    };
}

