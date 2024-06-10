/**
 * @ledge/external-api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/**
 * Model LeaderboardSchedule
 * @export
 * @interface LeaderboardSchedule
 */
export interface LeaderboardSchedule {
    /**
     *
     * @type {string}
     * @memberof LeaderboardSchedule
     */
    'leaderboardId': string;
    /**
     *
     * @type {boolean}
     * @memberof LeaderboardSchedule
     */
    'rewardsProcessed': boolean;
    /**
     *
     * @type {boolean}
     * @memberof LeaderboardSchedule
     */
    'scheduleProcessed': boolean;
    /**
     *
     * @type {boolean}
     * @memberof LeaderboardSchedule
     */
    'recurring': boolean;
    /**
     *
     * @type {string}
     * @memberof LeaderboardSchedule
     */
    'endTime': string | null;
    /**
     *
     * @type {string}
     * @memberof LeaderboardSchedule
     */
    'startTime': string;
    /**
     *
     * @type {string}
     * @memberof LeaderboardSchedule
     */
    'updatedAt': string;
    /**
     *
     * @type {string}
     * @memberof LeaderboardSchedule
     */
    'createdAt': string;
    /**
     *
     * @type {string}
     * @memberof LeaderboardSchedule
     */
    'id': string;
}