import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { PropertyUtils } from '../../utils';
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height: 'calc(100vh - 40px)'
    }
})

type GridColumn<T> = Partial<GridColDef> & {
    model?: (x: T) => any;// let name = props.name || PropertyUtils.propertyName<T, keyof T>(props.model!);
    name?: string;
    label?: string;
}

type Props<T> = {
    items: T[];
    onItemClick: (item: T, index: number) => void;
    onItemDelete?: (id: number) => void,
    columns: GridColumn<T>[];
    resource: string;
    itemKey: (item: T) => number;
};


function GridView<T>({ // è necessario che l'oggetto abbia un campo id (string | number)
    items,
    onItemClick,
    onItemDelete,
    itemKey,
    columns,
    resource
}: Props<T>) {

    const { t } = useTranslation();
    const classes = useStyles();

    let cc = columns.map(x => {
        let field = x.name || PropertyUtils.propertyName<T, keyof T>(x.model!);
        let headerName = x.label || t(`entities:${resource}.${field}`) || '';
        // let width = x.width || 50;
        return {
            ...x,
            field,
            headerName,
            // width
        }
    })

    let rows: GridRowsProp = items.map(x => {
        return {
            ...x,
            id: itemKey(x)
        }});

    // console.log(items, rows);
    return (
        <div className={classes.root}>
            <DataGrid 
                columns={cc} 
                rows={rows} 
                onRowClick={(rowParams) => { 
                    let item = items.find((x: any) => x['id'] === rowParams.columns.indexOf(x) /*.id*/);
                    // console.log(item, rowParams.rowIndex);
                    onItemClick(item!, rowParams.row.rowIndex);
                }} />
        </div>
    );
}

export default GridView;