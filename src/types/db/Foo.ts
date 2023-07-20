import type { DBBarId } from './Bar.js';
import type DBMyEnum from './MyEnum.js';
import type DBMyComposite from './MyComposite.js';
import type DBMyRange from './MyRange.js';
import type DBMyDomain from './MyDomain.js';
import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

export type DBFooId = number;

/** details.name: foo | details.kind: table | generateFor: selector */
export default interface DBFoo {
  id: ColumnType<DBFooId, DBFooId | null, DBFooId | null>;
  name: ColumnType<string, string, string | null>;
  barId: ColumnType<DBBarId, DBBarId, DBBarId | null>;
  myEnum: ColumnType<DBMyEnum, DBMyEnum, DBMyEnum | null>;
  myComposite: ColumnType<DBMyComposite, DBMyComposite, DBMyComposite | null>;
  myRange: ColumnType<DBMyRange, DBMyRange, DBMyRange | null>;
  myDomain: ColumnType<DBMyDomain, DBMyDomain, DBMyDomain | null>;
}

export type DBFooSelectable = Selectable<DBFoo>;

export type DBFooInsertable = Insertable<DBFoo>;

export type DBFooUpdateable = Updateable<DBFoo>;