import type DBMyEnum from './MyEnum.js';
import type DBMyComposite from './MyComposite.js';
import type DBMyRange from './MyRange.js';
import type DBMyDomain from './MyDomain.js';
import type { ColumnType, Selectable } from 'kysely';

/** details.name: my_materialized_view | details.kind: materializedView */
export default interface DBMyMaterializedView {
  id: ColumnType<number | null, never, never>;
  name: ColumnType<string | null, never, never>;
  fooId: ColumnType<number | null, never, never>;
  myEnum: ColumnType<DBMyEnum | null, never, never>;
  myComposite: ColumnType<DBMyComposite | null, never, never>;
  myRange: ColumnType<DBMyRange | null, never, never>;
  myDomain: ColumnType<DBMyDomain | null, never, never>;
}

export type DBMyMaterializedViewSelectable = Selectable<DBMyMaterializedView>;