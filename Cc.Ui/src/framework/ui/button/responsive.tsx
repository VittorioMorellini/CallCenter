import React from 'react';
import { Button, IconButton, Tooltip, useMediaQuery, Theme } from '@mui/material';
import { Breakpoint } from '@mui/material/styles';
import { useTheme } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import {
    Add as AddIcon,
    Save as SaveIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Undo as UndoIcon,
    ArrowForward as NextIcon,
    SystemUpdateAlt as ExportIcon,
    FileCopy as CloneIcon,
    Update as UpdateIcon,
    Send as SendIcon
} from '@mui/icons-material';
import { FilterIcon } from '../view/icons';
import { isNumber } from 'lodash';
interface Props {
    
    text: string;
    icon: any;
    onClick: (e: any) => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success' | undefined;
    disabled?: boolean;
    breakpoint?: Breakpoint; 
    variant?: 'responsive' | 'condensed' | undefined;
    buttonVariant?: 'contained' | 'outlined' | 'text' | undefined;
    width?: 'sm' | 'md' | 'lg' | 'auto' | number | undefined;
    style?: any;
}

const ResponsiveButton = ({ icon, color, text, variant, buttonVariant, width, disabled, onClick, style }: Props) => {

    variant = variant || 'responsive';
    buttonVariant = buttonVariant === 'text' ? undefined : buttonVariant;
    width = width || 'md';
    color = color || 'inherit';
    
    const theme: Theme = useTheme();
    let expanded =  useMediaQuery(theme.breakpoints.up('md'));
    if (variant === 'condensed')
        expanded = false;

    let iconWithMargin = React.cloneElement(icon, { style: {marginRight: '8px'}});
    let w = isNumber(width) ? width : 'auto';
    switch (width) {
        case 'sm':
            w = 80; break;
        case 'md':
            w = 120; break;
        case 'lg':
            w = 160; break;
        default:
            w = w; break;
    }
    let buttonStyle = { };
    if (buttonVariant) {
        buttonStyle = { 
            padding: '6px 12px 6px 6px', 
            marginLeft: '1em',
            width: w
        }
    }

    buttonStyle = { ...buttonStyle, ...style };

    if (expanded) {
        return (
            <Button color={color} onClick={onClick} variant={buttonVariant} style={buttonStyle} disabled={disabled}>
                {iconWithMargin}{text}
            </Button>
        );
    } else {
        return (
            <Tooltip title={text || ''}>
                <IconButton color={color} onClick={onClick} style={{padding: 0, marginLeft: '8px'}} disabled={disabled}>
                    {icon}
                </IconButton>
            </Tooltip>
        );
    }
}

export default ResponsiveButton;

type PropsImpl = {
    text?: string;
    icon?: any;
    onClick: (e?: any) => any;
    disabled?: boolean;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'  | undefined;
    breakpoint?: Breakpoint; 
    variant?: 'responsive' | 'condensed' | undefined;
    buttonVariant?: 'contained' | 'outlined' | undefined;
    width?: 'sm' | 'md' | 'lg' | 'auto' | number | undefined;
    style?: any;
    // children?: any;
}

const handleClick = (props: PropsImpl) => (e: any) => { 
    e.stopPropagation();
    props.onClick(e);
}

export const AddButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'contained';
    return <ResponsiveButton text={p.text || t('common:add')} icon={<AddIcon />} {...p} onClick={handleClick(props)} />
}

export const UpdateButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'contained';
    return <ResponsiveButton text={p.text || t('common:update')} icon={<UpdateIcon />} {...p} onClick={handleClick(props)} />
}

export const SaveButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'contained';
    return <ResponsiveButton text={p.text || t('common:save')} icon={<SaveIcon />} {...p} onClick={handleClick(props)} />
}

export const DeleteButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'outlined';
    return <ResponsiveButton text={p.text || t('common:delete')} icon={<DeleteIcon />} {...p} onClick={handleClick(props)} />
}

export const FilterButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'outlined';
    return <ResponsiveButton text={p.text || t('common:filter')} icon={<FilterIcon />} {...p} onClick={handleClick(props)} />
}

export const SearchButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.variant = p.variant || 'condensed';
    p.buttonVariant = p.buttonVariant || 'outlined';
    return <ResponsiveButton text={props.text || t('common:search')} icon={<SearchIcon />} {...p} onClick={handleClick(props)} />
}

export const UndoButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'outlined';
    return <ResponsiveButton text={p.text || t('common:undo')} icon={<UndoIcon />} {...p} onClick={handleClick(props)} />
}

export const NextButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'contained';
    return <ResponsiveButton text={p.text || t('common:next')} icon={<NextIcon />} {...p} onClick={handleClick(props)} />
}

export const ExportButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'outlined';
    return <ResponsiveButton text={p.text || t('common:export')} icon={<ExportIcon />} {...p} onClick={handleClick(props)} />
}

export const CloneButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'outlined';
    return <ResponsiveButton text={p.text || t('common:clone')} icon={<CloneIcon />} {...p} onClick={handleClick(props)} />
}

export const SendButton = (props: PropsImpl) => {
    const { t } = useTranslation();
    let p = {...props};
    p.color = p.color || 'primary';
    p.buttonVariant = p.buttonVariant || 'outlined';
    return <ResponsiveButton text={p.text || t('common:mail')} icon={<SendIcon />} {...p} onClick={handleClick(props)} />
}
