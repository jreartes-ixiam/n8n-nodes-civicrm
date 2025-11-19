import type {
	ICredentialDataDecryptedObject,
	ICredentialTestFunctions,
	ICredentialsDecrypted,
	INodeProperties,
} from 'n8n-workflow';

export class CiviCrmApi {

	name = 'civiCrmApi';
	displayName = 'CiviCRM API';
	documentationUrl = 'https://docs.civicrm.org/dev/en/latest/api/';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	// ✔ Autenticación genérica (esto sí es válido)
	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				'X-Civi-Auth': '={{"Bearer " + $credentials.apiToken}}',
			},
		},
	};

	async test(
	this: ICredentialTestFunctions,
	credentials: ICredentialsDecrypted<ICredentialDataDecryptedObject>,
) {
	const data = credentials.data as { baseUrl: string; apiToken: string };

	const baseUrl = data.baseUrl.replace(/\/$/, '');
	const token = data.apiToken;

	try {
		const response = await this.helpers.request({
			method: 'POST',
			url: `${baseUrl}/civicrm/ajax/api4/Contact/get`,
			json: true,
			body: { limit: 1 },
			headers: {
				'X-Civi-Auth': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (response?.values !== undefined) {
			return {
				status: 'OK',
				message: 'Connection successful.',
			};
		}

		return {
			status: 'Error',
			message: 'Unexpected API response.',
		};
	} catch (error: any) {
		return {
			status: 'Error',
			message: error.message,
		};
	}
}
}
