import type { DBFooId } from './Foo.js';
import type { DBBarId } from './Bar.js';
import type DBMyEnum from './MyEnum.js';
import type DBMyComposite from './MyComposite.js';
import type DBMyRange from './MyRange.js';
import type DBMyDomain from './MyDomain.js';
import type { ColumnType, Selectable } from 'kysely';

/** details.name: my_view | details.kind: view */
export default interface DBMyView {
  id: ColumnType<DBFooId, never, never>;
  name: ColumnType<string, never, never>;
  barId: ColumnType<DBBarId, never, never>;
  myEnum: ColumnType<DBMyEnum, never, never>;
  myComposite: ColumnType<DBMyComposite, never, never>;
  myRange: ColumnType<DBMyRange, never, never>;
  myDomain: ColumnType<DBMyDomain, never, never>;
}

export type DBMyViewSelectable = Selectable<DBMyView>;