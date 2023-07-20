import kanel from 'kanel';
import { join } from 'node:path';

import {
    convertESMPathsHook,
    generateIndexHook,
    kanelKyselyHook,
    trimWhitespaceHook
} from './hooks/index.js';

import { generateTypeNames } from './util/generate-type-names.js';
import { toCamelCase, toPascalCase } from './util/recase.js';

export async function processDatabase() {
    await kanel.processDatabase({
        connection: {
            user: '', // <= username
            password: '', // <= password
            host: 'localhost',
            port: 5432,
            database: 'test'
        },

        outputPath: 'src/types',
        resolveViews: true,
        preDeleteOutputFolder: true,
        enumStyle: 'type',

        preRenderHooks: [kanelKyselyHook, generateIndexHook],
        postRenderHooks: [trimWhitespaceHook, convertESMPathsHook],

        getMetadata: (details, generateFor, instantiatedConfig) => {
            /* details.kind: table */
            if (['table'].includes(details.kind)) {
                return {
                    name: toPascalCase(`${details.name}_${generateFor}`),
                    comment: [`details.name: ${details.name} | details.kind: ${details.kind} | generateFor: ${generateFor}`],
                    path: join(instantiatedConfig.outputPath, 'db', toPascalCase(details.name)),
                };

            }

            /* details.kind: view, materializedView, compositeType, domain, enum, range */
            else {
                return {
                    name: generateTypeNames({ name: details.name, isTable: false }).name,
                    comment: [`details.name: ${details.name} | details.kind: ${details.kind}`],
                    path: join(instantiatedConfig.outputPath, 'db', toPascalCase(details.name)),
                };
            }
        },

        generateIdentifierType: (column, details, config) => {
            const innerType = kanel.resolveType(column, details, {
                ...config,
                generateIdentifierType: undefined,
            });

            return {
                name: generateTypeNames({ name: `${details.name}_${column.name}`, isTable: false }).name,
                declarationType: 'typeDeclaration',
                exportAs: 'named',
                typeDefinition: [innerType],
            }
        },

        getPropertyMetadata: (property, details, generateFor) => {
            return {
                name: toCamelCase(property.name),
            }
        },
    });

}

try {
    await processDatabase();
} catch (error) {
    console.error(error);
}


