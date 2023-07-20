import { recase } from '@kristiandupont/recase';

export const toCamelCase = recase('snake', 'camel');
export const toPascalCase = recase('snake', 'pascal');