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
 * Token payload
 * @export
 * @interface PostBanUserOrTokenRequestAdminAuthPayload
 */
export interface PostBanUserOrTokenRequestAdminAuthPayload {
    /**
     * User ID
     * @type {number}
     * @memberof PostBanUserOrTokenRequestAdminAuthPayload
     */
    uid: number;
    /**
     * Issued at timestamp in seconds
     * @type {number}
     * @memberof PostBanUserOrTokenRequestAdminAuthPayload
     */
    iat: number;
    /**
     * Expiration time in seconds (0 for no expiration)
     * @type {number}
     * @memberof PostBanUserOrTokenRequestAdminAuthPayload
     */
    exp: number;
}

/**
 * Check if a given object implements the PostBanUserOrTokenRequestAdminAuthPayload interface.
 */
export function instanceOfPostBanUserOrTokenRequestAdminAuthPayload(value: object): boolean {
    if (!('uid' in value)) return false;
    if (!('iat' in value)) return false;
    if (!('exp' in value)) return false;
    return true;
}

export function PostBanUserOrTokenRequestAdminAuthPayloadFromJSON(json: any): PostBanUserOrTokenRequestAdminAuthPayload {
    return PostBanUserOrTokenRequestAdminAuthPayloadFromJSONTyped(json, false);
}

export function PostBanUserOrTokenRequestAdminAuthPayloadFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostBanUserOrTokenRequestAdminAuthPayload {
    if (json == null) {
        return json;
    }
    return {
        
        'uid': json['uid'],
        'iat': json['iat'],
        'exp': json['exp'],
    };
}

export function PostBanUserOrTokenRequestAdminAuthPayloadToJSON(value?: PostBanUserOrTokenRequestAdminAuthPayload | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'uid': value['uid'],
        'iat': value['iat'],
        'exp': value['exp'],
    };
}

