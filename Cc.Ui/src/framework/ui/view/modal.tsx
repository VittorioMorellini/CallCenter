import React from 'react';
import { useTranslation } from 'react-i18next';
import { Theme, useTheme, useMediaQuery, Dialog, DialogActions, Button } from '@mui/material';
import { Form } from '../form';
import { useFormItem } from '../../hooks';
import { Entity, YupValidator } from '../../entity';
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
    root: { 

    }
});

type Props<T extends Entity> = {
    open: boolean,
    currentItem: T,
    onCancel: () => void,
    onConfirm: (item: T) => void,
    fields: any | ((props: ModalItemProps<T>) => any),
    fullScreen?: boolean,
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false, 
    content?: any | ((props: ModalItemProps<T>) => any),
    validator?: YupValidator
}

export type ModalItemProps<T extends Entity> = {
    item: T;
    setItem: (obj: T) => void;
}

export default <T extends Entity> ({
    open,
    currentItem,
    onCancel,
    onConfirm,
    fields,
    fullScreen,
    maxWidth,
    content,
    validator
}: Props<T>) => {

    maxWidth = maxWidth || 'sm';
    const theme: Theme = useTheme();
    const full = fullScreen !== undefined ? fullScreen : useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const { t } = useTranslation();

    const [item, setItem] = useFormItem(currentItem);
    if (typeof fields === 'function')
        fields = fields({item, setItem});
    if (typeof content === 'function')
        content = content({item, setItem});

    return (
        <Dialog 
            className={classes.root}
            open={open}
            fullScreen={full}
            fullWidth={true}
            maxWidth={maxWidth}
        >
            <Form item={item} handleChange={setItem} style={{padding: '1rem'}} validator={validator}>
                {fields}
            </Form>
            {content}
            <DialogActions>
                <Button 
                    onClick={(e: any) => { onCancel(); }} 
                    style={{marginRight: '4px'}}
                    color="primary"
                >{t('common:cancel')}</Button>
                <Button 
                    onClick={(e: any) => { onConfirm(item); }} 
                    style={{marginRight: '4px'}}
                    color="primary"
                >{t('common:save')}</Button>
            </DialogActions>
        </Dialog>
    );
};