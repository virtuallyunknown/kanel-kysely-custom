import { join, relative, sep } from "path";
import { generateTypeNames } from '../util/generate-type-names.js';

export function generateIndexHook(outputAcc, instantiatedConfig) {
    const allEntities = Object.values(instantiatedConfig.schemas).reduce((acc, elem) => {
        const entitiesInSchema = Object.values(elem)
            .filter(Array.isArray)
            .reduce((acc2, elem2) => [...acc2, ...elem2], []);
        return [...acc, ...entitiesInSchema];
    }, []);

    const lines = allEntities.map((details) => {
        let result;

        const importPath = relative(
            instantiatedConfig.outputPath,
            instantiatedConfig.getMetadata(details, "selector", instantiatedConfig).path
        );

        if (sep === "\\") {
            importPath = importPath.replace(/\\/g, "/");
        }

        /**
         * table
         * > interface, selectable, insertable, updateable
         */
        if (details.kind === 'table') {
            const { tableInterfaceName, selectableName, insertableName, updatableName } = generateTypeNames({ name: details.name, isTable: true });
            const additionalImports = [selectableName, insertableName, updatableName];

            if (instantiatedConfig.generateIdentifierType) {
                const identifierColumns = details.columns.filter((column) => column.isPrimaryKey && !column.reference);

                identifierColumns.forEach((column) => {
                    const { name } = generateTypeNames({ name: `${details.name}_${column.name}`, isTable: false });
                    additionalImports.push(name);
                });
            }

            result = `export type { default as ${tableInterfaceName}, ${additionalImports.join(", ")} } from './${importPath}.js';`;
        }

        /**
        * view, materializedView, compositeType
        * > interface, selectable
        */
        else if (['view', 'materializedView', 'compositeType'].includes(details.kind)) {
            const { tableInterfaceName, selectableName } = generateTypeNames({ name: details.name, isTable: true });
            const additionalImports = [selectableName];

            result = `export type { default as ${tableInterfaceName}, ${additionalImports.join(", ")} } from './${importPath}.js';`;
        }

        /**
        * domain, enum, range
        * > interface
        */
        else {
            const prefix = instantiatedConfig.enumStyle === "type" ? "type " : "";
            const { name } = generateTypeNames({ name: details.name, isTable: false });

            result = `export ${prefix}{ default as ${name} } from './${importPath}.js';`;
        }

        return result;
    });

    const indexFile = {
        declarations: [
            {
                declarationType: "generic",
                lines,
            },
        ],
    };

    const path = join(instantiatedConfig.outputPath, "db-types");

    return {
        ...outputAcc,
        [path]: indexFile,
    };
}
