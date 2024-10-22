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
 * Reaction count
 * @export
 * @interface PostQueryUserReacts200ResponseResultSentInner
 */
export interface PostQueryUserReacts200ResponseResultSentInner {
    /**
     * Smiley string (S1 version)
     * @type {string}
     * @memberof PostQueryUserReacts200ResponseResultSentInner
     */
    smiley: string;
    /**
     * 
     * @type {number}
     * @memberof PostQueryUserReacts200ResponseResultSentInner
     */
    count: number;
}

/**
 * Check if a given object implements the PostQueryUserReacts200ResponseResultSentInner interface.
 */
export function instanceOfPostQueryUserReacts200ResponseResultSentInner(value: object): boolean {
    if (!('smiley' in value)) return false;
    if (!('count' in value)) return false;
    return true;
}

export function PostQueryUserReacts200ResponseResultSentInnerFromJSON(json: any): PostQueryUserReacts200ResponseResultSentInner {
    return PostQueryUserReacts200ResponseResultSentInnerFromJSONTyped(json, false);
}

export function PostQueryUserReacts200ResponseResultSentInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostQueryUserReacts200ResponseResultSentInner {
    if (json == null) {
        return json;
    }
    return {
        
        'smiley': json['smiley'],
        'count': json['count'],
    };
}

export function PostQueryUserReacts200ResponseResultSentInnerToJSON(value?: PostQueryUserReacts200ResponseResultSentInner | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'smiley': value['smiley'],
        'count': value['count'],
    };
}

