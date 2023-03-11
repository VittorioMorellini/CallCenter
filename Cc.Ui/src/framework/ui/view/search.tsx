import React from 'react';
import { useTranslation } from 'react-i18next';
import { Panel, Button } from '../';
import { Form } from '../form';
import { Entity } from '../../entity';

// const useStyles = makeStyles({
//     // root: {
//     //     marginLeft: 0
//     // }
// })

type Props<T extends Entity> = {
    title?: string;
    item: T;
    setItem: any;
    children: any;
    onSearch: (model: T) => void;
    onExport?: (model: T) => void;
}

function SearchView<T extends Entity>({
    title,
    item,
    setItem,
    children,
    onSearch,
    onExport
}: Props<T>) {

    const { t } = useTranslation();
    // const classes = useStyles();

    return (
        <Panel 
            // className={classes.root}
            title={title || t('common:search')}
            actions={
                <>
                    <Button.Search onClick={() => onSearch(item)} />
                    {onExport ? <Button.Export variant="condensed" onClick={() => onExport(item)} /> : null}
                </>
            }
        >
            <Form item={item} handleChange={setItem}>
                {children}
            </Form>
        </Panel>
    )
}

export default SearchView