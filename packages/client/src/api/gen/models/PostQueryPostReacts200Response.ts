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
import type { PostQueryPostReacts200ResponseResultInner } from './PostQueryPostReacts200ResponseResultInner';
import {
    PostQueryPostReacts200ResponseResultInnerFromJSON,
    PostQueryPostReacts200ResponseResultInnerFromJSONTyped,
    PostQueryPostReacts200ResponseResultInnerToJSON,
} from './PostQueryPostReacts200ResponseResultInner';

/**
 * 
 * @export
 * @interface PostQueryPostReacts200Response
 */
export interface PostQueryPostReacts200Response {
    /**
     * 
     * @type {boolean}
     * @memberof PostQueryPostReacts200Response
     */
    success: boolean;
    /**
     * 
     * @type {Array<PostQueryPostReacts200ResponseResultInner>}
     * @memberof PostQueryPostReacts200Response
     */
    result: Array<PostQueryPostReacts200ResponseResultInner>;
    /**
     * Error message if success is false, otherwise undefined, compatible with response error
     * @type {string}
     * @memberof PostQueryPostReacts200Response
     */
    message: string;
}

/**
 * Check if a given object implements the PostQueryPostReacts200Response interface.
 */
export function instanceOfPostQueryPostReacts200Response(value: object): boolean {
    if (!('success' in value)) return false;
    if (!('result' in value)) return false;
    if (!('message' in value)) return false;
    return true;
}

export function PostQueryPostReacts200ResponseFromJSON(json: any): PostQueryPostReacts200Response {
    return PostQueryPostReacts200ResponseFromJSONTyped(json, false);
}

export function PostQueryPostReacts200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostQueryPostReacts200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'success': json['success'],
        'result': ((json['result'] as Array<any>).map(PostQueryPostReacts200ResponseResultInnerFromJSON)),
        'message': json['message'],
    };
}

export function PostQueryPostReacts200ResponseToJSON(value?: PostQueryPostReacts200Response | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'success': value['success'],
        'result': ((value['result'] as Array<any>).map(PostQueryPostReacts200ResponseResultInnerToJSON)),
        'message': value['message'],
    };
}

