import type BarSelectorTable from './Bar.js';
import type FooSelectorTable from './Foo.js';
import type DBMyViewTable from './MyView.js';
import type DBMyMaterializedViewTable from './MyMaterializedView.js';
import type DBMyCompositeTable from './MyComposite.js';

export default interface PublicSchema {
  bar: BarSelectorTable;
  foo: FooSelectorTable;
  my_view: DBMyViewTable;
  my_materialized_view: DBMyMaterializedViewTable;
  my_composite: DBMyCompositeTable;
}