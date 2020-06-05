import fetch from 'node-fetch';
import AWSXRay from 'aws-xray-sdk';
import { cleanupUrbanDictionaryDefinition, ellipsify } from './util';

export const handler = async (event: any = {}): Promise<any> => {
    AWSXRay.enableAutomaticMode();

    console.log(JSON.stringify(event, null, 2));

    var term: string = event.params.querystring.term;
    console.log(`Fetching definition for ${term}`);

    const API_BASE: string = 'https://api.urbandictionary.com/v0/define?term=';
    var apiUrl: string = `${API_BASE}${term}`;
    var apiResponse = await fetch(apiUrl);
    var body = await apiResponse.json();

    var definition: string = body.list[0].definition;
    definition = cleanupUrbanDictionaryDefinition(definition);

    const MAX_RESPONSE_LENGTH: number = 450;
    var response: string = `Definition of ${term}: ${definition}`;
    response = ellipsify(response, MAX_RESPONSE_LENGTH);
    return response;
};
