import * as React from 'react';

import { withStyles, StyleRulesCallback } from '@mui/styles';
import { List, ListItem, Theme } from '@mui/material';
import { Entity } from '../../entity';

const styles: StyleRulesCallback<Theme, {}> = (theme: Theme) => ({
    /*root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    list: {
        // height: 'calc(100vh - 40px)'
        // overflowY: 'auto'
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto'
    }*/
});

interface EntityListProps<T extends Entity> {

    items: T[];    
    onItemClick: (item: T, index: number) => void;
    onItemRender: (item: T) => any;
    itemKey?: (item: T) => string | number | undefined;
    selectedIndex?: number;
    highlightSelected?: boolean;
    classes: any;
    style?: any;
}

export class EntityList<T extends Entity> extends React.Component<EntityListProps<T>, any> {

    constructor(props: EntityListProps<T>) {
        super(props);
    }    

    render() {
        
        let { classes, selectedIndex, highlightSelected, itemKey } = this.props;

        const list = this.props.items !== undefined ? (
                <List className={classes.list}>
                    {this.props.items.map((item: T, index: number) => (
                        <ListItem 
                            key={(itemKey ? itemKey(item) : (item as { [k: string]: any })['id']) || index}
                            button={true} 
                            divider={true}
                            selected={highlightSelected === true && selectedIndex !== undefined && selectedIndex === index}
                            onClick={(e) => { this.props.onItemClick(item, index); }}
                        >
                            {this.props.onItemRender(item)}
                        </ListItem>
                    ))}
                </List>
        ) : null;

        return (
            <div style={{ flex: '1 0 auto', ...this.props.style }}>
                {list}
            </div>
        );
    }
}

export default withStyles(styles)(EntityList);