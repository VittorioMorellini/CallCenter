import * as React from 'react';
import { ListItem } from '@mui/material';
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized';

interface ListProps<T extends { [key: string]: any }> {

    items: T[];
    onItemClick: (item: T, index: number) => void;
    onItemRender: (item: T) => any;
    itemKey?: (item: T) => string | number | undefined;
    selectedIndex?: number;
    rowHeight?: number;
    overscanRowCount?: number;
    classes?: any;
    style?: any;
    highlightSelected?: boolean;
}

class VirtualizedList<T extends { [key: string]: any}> extends React.Component<ListProps<T>, any> {

    cache: CellMeasurerCache;

    constructor(props: ListProps<T>) {

        super(props);

        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: props.rowHeight || 100
        });
    }

    render() {
        
        let { items, selectedIndex, highlightSelected, itemKey } = this.props;
        let classes = this.props.classes || {};

        if (items === undefined) {
            return null;
        }

        let renderRow = ({ index, key, style, parent }: any) => {

            let item = items[index];
            let ik = (itemKey ? itemKey(item) : item['id']) || key;
            return (
                <CellMeasurer 
                    key={ik}
                    cache={this.cache}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                >
                    <ListItem 
                        key={ik}
                        button={true} 
                        divider={true}
                        style={style}
                        selected={highlightSelected === true && selectedIndex !== undefined && selectedIndex === index}
                        className={classes.listItem}
                        onClick={(e: any) => { this.props.onItemClick(item, index); }}
                    >
                        {this.props.onItemRender(item)}
                    </ListItem>
                </CellMeasurer>
            );
        };

        return (
            // Raccomandazione dei creatori:
            // When using an AutoSizer as a direct child of a flex box it usually works out best to wrap it with a div
            <div style={{ flex: '1 0 auto', ...this.props.style }}>
                <AutoSizer>
                    {({ height, width }: any) => (
                        <List
                            height={height}
                            width={width}
                            deferredMeasurementCache={this.cache}
                            rowHeight={this.cache.rowHeight}
                            rowCount={items.length}
                            overscanRowCount={this.props.overscanRowCount || 3}
                            scrollToIndex={this.props.selectedIndex || 0}
                            rowRenderer={renderRow}
                            style={{outline: 'none'}}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }
}

export default VirtualizedList;