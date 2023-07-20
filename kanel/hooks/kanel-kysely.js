import kanelKysely from 'kanel-kysely';
import { generateTypeNames } from '../util/generate-type-names.js';

export const kanelKyselyHook = kanelKysely.makeKyselyHook({
    databaseFilename: 'db',
    getKyselyItemMetadata(details, selectorName, canInitialize, canMutate) {
        const typeNames = generateTypeNames({ name: details.name, isTable: true })

        return ({
            tableInterfaceName: typeNames.tableInterfaceName,
            selectableName: typeNames.selectableName,
            insertableName: canInitialize ? typeNames.insertableName : undefined,
            updatableName: canMutate ? typeNames.updatableName : undefined,
        })
    }
})