"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.civiCrmApi = exports.CiviCrmApi = void 0;
class CiviCrmApi {
    constructor() {
        this.name = 'civiCrmApi';
        this.displayName = 'CiviCRM API';
        this.documentationUrl = 'https://docs.civicrm.org/dev/en/latest/api/v4/usage/#auth';
        this.properties = [
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: '',
                placeholder: 'https://example.org/civicrm',
                required: true,
            },
            {
                displayName: 'API Token',
                name: 'apiToken',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-Civi-Auth': '={{ "Bearer " + $credentials.apiToken }}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.baseUrl}}',
                url: '/civicrm/ajax/api4/Contact/get',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: {
                    params: JSON.stringify({ select: ['id'], limit: 1 }),
                },
            },
        };
    }
}
exports.CiviCrmApi = CiviCrmApi;
exports.civiCrmApi = CiviCrmApi;
