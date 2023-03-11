import * as React from 'react';
import { ListItem } from '@mui/material';
import { AutoSizer, List, CellMeasurerCache, CellMeasurer, InfiniteLoader } from 'react-virtualized';
import { PageLoader } from '../../core/types';

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

    pageLoader?: PageLoader;
}

class VirtualizedList<T extends { [key: string]: any }> extends React.Component<ListProps<T>, any> {

    cache: CellMeasurerCache;

    constructor(props: ListProps<T>) {

        super(props);

        this.state = {
            loadedRowCount: 0,
            loadedRowsMap: {},
            loadingRowCount: 0,
        };

        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: props.rowHeight || 100
        });
    }

    render() {

        let { items, selectedIndex, highlightSelected, itemKey } = this.props;
        let { isLoading, hasNext, loadNext } = this.props.pageLoader || {
            isLoading: false,
            hasNext: false,
             // tslint:disable-next-line: no-empty
            loadNext: (skip: number) => Promise.resolve()
        };

        let classes = this.props.classes || {};

        if (items === undefined) {
            return null;
        }

        const rowCount = hasNext
            ? items.length + 1
            : items.length;

        // Only load 1 page of items at a time.
        // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
        const loadMoreRows = isLoading || loadNext === undefined
            // tslint:disable-next-line: no-empty
            ? (skip: number) => Promise.resolve()
            : loadNext;

        // Every row is loaded except for our loading indicator row.
        const isRowLoaded = ({ index }: any) => !hasNext || index < items.length;

        // Render a list item or a loading indicator.
        /*const rowRenderer = ({ index, key, style }) => {
            let content

            if (!isRowLoaded({ index })) {
                content = 'Loading...'
            } else {
                content = items.getIn([index, 'name'])
            }

            return (
                <div
                    key={key}
                    style={style}
                >
                    {content}
                </div>
            )
        }*/

        let renderRow = ({ index, key, style, parent }: any) => {

            if (!isRowLoaded({ index })) {
                return;
                // return (
                //     <div
                //         key={key}
                //         style={style}
                //     >
                //         <span>Loading...</span>
                //     </div>
                // );
            }

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

        let scrollToIndex = this.props.selectedIndex !== undefined && this.props.selectedIndex > 0 ? this.props.selectedIndex : undefined;

        return (
            // Raccomandazione dei creatori:
            // When using an AutoSizer as a direct child of a flex box it usually works out best to wrap it with a div
            <div style={{ flex: '1 0 auto', ...this.props.style }}>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={({startIndex}) => loadMoreRows(startIndex)}
                    rowCount={rowCount}
                >
                    {({ onRowsRendered, registerChild }: any) => (
                        <AutoSizer>
                            {({ height, width }: any) => (
                                <List
                                    height={height}
                                    width={width}
                                    deferredMeasurementCache={this.cache}
                                    rowHeight={this.cache.rowHeight}
                                    rowCount={rowCount}
                                    overscanRowCount={this.props.overscanRowCount || 3}
                                    scrollToIndex={scrollToIndex}
                                    rowRenderer={renderRow}
                                    onRowsRendered={onRowsRendered}
                                    ref={registerChild}
                                    style={{ outline: 'none' }}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </div>
        );
    }
}

export default VirtualizedList;