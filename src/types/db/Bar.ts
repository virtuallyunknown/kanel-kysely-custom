import type DBMyEnum from './MyEnum.js';
import type DBMyComposite from './MyComposite.js';
import type DBMyRange from './MyRange.js';
import type DBMyDomain from './MyDomain.js';
import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

export type DBBarId = number;

/** details.name: bar | details.kind: table | generateFor: selector */
export default interface DBBar {
  id: ColumnType<DBBarId, DBBarId | null, DBBarId | null>;
  name: ColumnType<string, string, string | null>;
  fooId: ColumnType<number, number, number | null>;
  myEnum: ColumnType<DBMyEnum, DBMyEnum, DBMyEnum | null>;
  myComposite: ColumnType<DBMyComposite, DBMyComposite, DBMyComposite | null>;
  myRange: ColumnType<DBMyRange, DBMyRange, DBMyRange | null>;
  myDomain: ColumnType<DBMyDomain, DBMyDomain, DBMyDomain | null>;
}

export type DBBarSelectable = Selectable<DBBar>;

export type DBBarInsertable = Insertable<DBBar>;

export type DBBarUpdateable = Updateable<DBBar>;