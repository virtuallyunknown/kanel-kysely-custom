import type { ColumnType, Selectable } from 'kysely';

/** details.name: my_composite | details.kind: compositeType */
export default interface DBMyComposite {
  name: ColumnType<string | null, never, never>;
  number: ColumnType<number | null, never, never>;
}

export type DBMyCompositeSelectable = Selectable<DBMyComposite>;