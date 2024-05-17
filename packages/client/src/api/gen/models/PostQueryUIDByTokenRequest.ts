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
import type { PostBanUserOrTokenRequestAdminAuth } from './PostBanUserOrTokenRequestAdminAuth';
import {
    PostBanUserOrTokenRequestAdminAuthFromJSON,
    PostBanUserOrTokenRequestAdminAuthFromJSONTyped,
    PostBanUserOrTokenRequestAdminAuthToJSON,
} from './PostBanUserOrTokenRequestAdminAuth';

/**
 * 
 * @export
 * @interface PostQueryUIDByTokenRequest
 */
export interface PostQueryUIDByTokenRequest {
    /**
     * Token to query
     * @type {string}
     * @memberof PostQueryUIDByTokenRequest
     */
    token: string;
    /**
     * 
     * @type {PostBanUserOrTokenRequestAdminAuth}
     * @memberof PostQueryUIDByTokenRequest
     */
    adminAuth: PostBanUserOrTokenRequestAdminAuth;
}

/**
 * Check if a given object implements the PostQueryUIDByTokenRequest interface.
 */
export function instanceOfPostQueryUIDByTokenRequest(value: object): boolean {
    if (!('token' in value)) return false;
    if (!('adminAuth' in value)) return false;
    return true;
}

export function PostQueryUIDByTokenRequestFromJSON(json: any): PostQueryUIDByTokenRequest {
    return PostQueryUIDByTokenRequestFromJSONTyped(json, false);
}

export function PostQueryUIDByTokenRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostQueryUIDByTokenRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'token': json['token'],
        'adminAuth': PostBanUserOrTokenRequestAdminAuthFromJSON(json['adminAuth']),
    };
}

export function PostQueryUIDByTokenRequestToJSON(value?: PostQueryUIDByTokenRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'token': value['token'],
        'adminAuth': PostBanUserOrTokenRequestAdminAuthToJSON(value['adminAuth']),
    };
}
