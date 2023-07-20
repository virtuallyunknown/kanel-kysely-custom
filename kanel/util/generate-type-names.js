import { toPascalCase } from './recase.js';

export function generateTypeNames({ name, isTable }) {
    const pascalName = toPascalCase(name);

    return isTable
        ? {
            tableInterfaceName: `DB${pascalName}`,
            selectableName: `DB${pascalName}Selectable`,
            insertableName: `DB${pascalName}Insertable`,
            updatableName: `DB${pascalName}Updateable`
        }
        : { name: `DB${pascalName}` }
}