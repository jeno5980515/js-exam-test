import React from 'react';
import Border from 'components/Border';
import styles from './Grid.module.scss';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    const {
      layout,
      borderSize,
      totalWidth,
      totalHeight
    } = this.props;
    this.borderSize = borderSize || 10;
    this.totalHeight = totalHeight;
    this.totalWidth = totalWidth;
    this.layout = layout;
    this.columns = layout
      .reduce((cal, item) => {
        const newCal = [...cal];
        const { x } = item;
        newCal[x] = [...(newCal[x] || []), item];
        return newCal;
      }, [])
      .map(column => column || [])
      .map(column => column.sort((a, b) => a.y - b.y));

    this.state = {
      data: this.columns.map((column) => {
        return column.map((item) => {
          return {
            width: item.width,
            height: item.height
          };
        });
      })
    };
  }

  updateGridState = ({
    indexOfColumn, indexOfItem, width, height
  }) => {
    const { data } = this.state;
    const newData = [...data];
    if (width !== newData[indexOfColumn][0].width) {
      newData[indexOfColumn] = newData[indexOfColumn]
        .map((item) => {
          return {
            ...item,
            width
          };
        });
      newData[newData.length - 1] = newData[newData.length - 1].map((item) => {
        return {
          ...item,
          width: this.totalWidth - width
        };
      });
    } else if (height !== undefined && indexOfColumn !== undefined && indexOfItem !== undefined) {
      newData[indexOfColumn][indexOfItem].height = height;
      newData[indexOfColumn][newData[indexOfColumn].length - 1].height = this.totalHeight - newData[indexOfColumn][indexOfItem].height;
    }
    this.setState({ data: newData });
  }

  render() {
    const { columns } = this;
    const { children, width, height } = this.props;
    const { data } = this.state;
    return (
      <div
        className={styles.grid}
        style={{
          width,
          height
        }}
      >
        {
          columns.map((column, indexOfColumn) => {
            const maxWidth = Math.max(...column.map(item => item.maxWidth || 0));
            const minWidth = Math.min(...column.map(item => item.minWidth || 999999));
            const isDisabledForWidth = indexOfColumn === columns.length - 1;
            const finalWidth = isDisabledForWidth
              ? data[indexOfColumn][0].width
              : data[indexOfColumn][0].width + this.borderSize;
            return (
              <Border
                allowWidth
                borderSize={this.borderSize}
                width={finalWidth}
                maxWidth={maxWidth}
                minWidth={minWidth}
                onUpdate={({ width: w }) => this.updateGridState({
                  indexOfColumn,
                  width: w
                })}
                disabled={indexOfColumn === columns.length - 1}
                key={JSON.stringify(column)}
              >
                {
                  column.map((item, indexOfItem) => {
                    const itemInData = data[indexOfColumn][indexOfItem];
                    const itemInColumns = columns[indexOfColumn][indexOfItem];
                    const isDisabled = indexOfItem === column.length - 1 || itemInColumns.static;
                    return (
                      <Border
                        allowHeight
                        borderSize={this.borderSize}
                        width={itemInData.width}
                        height={itemInData.height}
                        maxHeight={itemInColumns.maxHeight}
                        minHeight={itemInColumns.minHeight}
                        onUpdate={({ width: w, height: h }) => this.updateGridState({
                          indexOfItem,
                          indexOfColumn,
                          width: w,
                          height: h
                        })}
                        disabled={isDisabled}
                        key={JSON.stringify(item)}
                      >
                        { children.find(({ key }) => key === item.key) }
                      </Border>
                    );
                  })
                }
              </Border>
            );
          })
        }
      </div>
    );
  }
}
