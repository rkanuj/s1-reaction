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
 * Reaction count with reacted status
 * @export
 * @interface PostQueryPostReacts200ResponseResultInnerReactsInner
 */
export interface PostQueryPostReacts200ResponseResultInnerReactsInner {
    /**
     * Smiley string (S1 version)
     * @type {string}
     * @memberof PostQueryPostReacts200ResponseResultInnerReactsInner
     */
    smiley: string;
    /**
     * 
     * @type {number}
     * @memberof PostQueryPostReacts200ResponseResultInnerReactsInner
     */
    count: number;
    /**
     * Whether the user has reacted with this smiley, 0 for false, positive for true
     * @type {number}
     * @memberof PostQueryPostReacts200ResponseResultInnerReactsInner
     */
    reacted: number;
}

/**
 * Check if a given object implements the PostQueryPostReacts200ResponseResultInnerReactsInner interface.
 */
export function instanceOfPostQueryPostReacts200ResponseResultInnerReactsInner(value: object): boolean {
    if (!('smiley' in value)) return false;
    if (!('count' in value)) return false;
    if (!('reacted' in value)) return false;
    return true;
}

export function PostQueryPostReacts200ResponseResultInnerReactsInnerFromJSON(json: any): PostQueryPostReacts200ResponseResultInnerReactsInner {
    return PostQueryPostReacts200ResponseResultInnerReactsInnerFromJSONTyped(json, false);
}

export function PostQueryPostReacts200ResponseResultInnerReactsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostQueryPostReacts200ResponseResultInnerReactsInner {
    if (json == null) {
        return json;
    }
    return {
        
        'smiley': json['smiley'],
        'count': json['count'],
        'reacted': json['reacted'],
    };
}

export function PostQueryPostReacts200ResponseResultInnerReactsInnerToJSON(value?: PostQueryPostReacts200ResponseResultInnerReactsInner | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'smiley': value['smiley'],
        'count': value['count'],
        'reacted': value['reacted'],
    };
}

