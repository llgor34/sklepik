import { Response } from './response.interface';

export interface Version {
    number: string;
    features: string[];
}

export interface VersionResponse extends Response {
    version: Version;
}
