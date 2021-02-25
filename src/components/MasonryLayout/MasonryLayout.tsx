import React from 'react';
import { FlatList, FlatListProps, View } from 'react-native';

interface ItemProps {
  renderItem: any;
}
const Item: React.FC<ItemProps> = React.memo((props) => {
  // props
  const { renderItem, item, ...rest } = props;

  return <View {...rest}>{renderItem(item)}</View>;
});

const Column: React.FC<FlatListProps<any>> = React.memo((props) => {
  console.log(props);

  // props
  //   const { renderItem } = props;
  // methods
  //   const _renderItem = React.useCallback(() => {
  //     return (
  //       <Item
  //         renderItem={renderItem}
  //         item={item}
  //         onLayout={(event) => {
  //           const { height } = event.nativeEvent.layout;
  //           this.state.height = this.state.height + height;
  //           this.setState({ height: this.state.height });
  //           item.onLayout && item.onLayout();
  //         }}
  //       />
  //     );
  //   }, [columns]);

  return <FlatList style={{ flex: 1 }} {...props} />;
});

interface Item {
  key: string;
  text: string;
  height: number;
}
interface MasonryLayoutProps extends Omit<FlatListProps<any>, 'data'> {
  columns?: number;
}
const MasonryLayout: React.FC<MasonryLayoutProps> = React.memo((props) => {
  // props
  const { ...rest } = props;
  // states
  const [columns, setColumns] = React.useState(() =>
    Array.from(new Array(props.columns)),
  );
  // methods
  const sortColumns = React.useCallback(
    () => columns.sort((a, b) => a.getHeight() - b.getHeight()),
    [columns],
  );
  const addItemsWithHeight = React.useCallback(
    (items: Item[]) => {
      // 生成临时 Column 映射
      const _columns = sortColumns().map((col) => {
        return {
          column: col,
          height: col.getHeight(),
          data: [],
        };
      });

      // 逐个分配 Item 到最小的 Column 中
      items.forEach((item) => {
        const col = _columns.sort((a, b) => a.height - b.height)[0];
        col.data.push(item);
        col.height += item.height;
      });

      // 批量添加 Column 的 Items
      _columns.forEach((col) => {
        col.column.addItems(col.data);
      });
    },
    [sortColumns],
  );

  return (
    <View style={{ flexDirection: 'row' }}>
      {columns.map((_, index) => (
        <Column key={index} {...rest} />
      ))}
    </View>
  );
});
MasonryLayout.defaultProps = {
  columns: 2,
};

export default MasonryLayout;
