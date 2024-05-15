import { query } from '../general/db-functions.mjs';
import { Version } from './schema/version.mjs';

export async function getVersion() {
    const version = (await query('SELECT * FROM version ORDER BY id DESC LIMIT 1'))[0];

    let features = await query('SELECT * FROM version_feature WHERE version_id = ?', [version.id]);
    features = features.map((feature) => feature.description);

    return new Version(version.number, features);
}
