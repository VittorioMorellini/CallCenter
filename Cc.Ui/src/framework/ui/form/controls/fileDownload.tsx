import * as React from 'react';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { Entity } from '../../../entity';
import { OutlinedFieldImplementation } from '../field';
import { Theme } from '@mui/material';
import { Icons } from '../../../../icons';
import { makeStyles, createStyles} from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => createStyles({
    dropzone: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        // marginBottom: '1rem'
    },
    dragActive: {
        borderColor: '#2196f3'
    },
    dragReject: {
        border: 'solid 2px red',
        backgroundColor: '#ffe0e0',
    },
    dragAccept: {
        border: 'solid 2px green',
        backgroundColor: '#e0ffe0',
    },
    file: {
        marginTop: 8,
        cursor: 'pointer'
    },
    root: {
        display: 'flex'
    }
}))

export function FileDownloadControl<T extends Entity>(props: FileDownloadProps<T>) {

    const classes = useStyles();

    const displayControl = (documentId: number) => {
        let control = (         
            <div
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (props.onDownload) {
                        props.onDownload(documentId);
                    }
                }}
            >
                {props.iconType === 'CSV' ? <Icons.CsvDocument /> : props.iconType === 'PDF' ? <Icons.PdfDocument /> :  <Icons.Document />}
            </div>
        )

        return <div className={classes.file}>{control}</div>;
    }


    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let value = field.value;

                return (
                    <div className={classes.root}>
                        {displayControl(value)}
                    </div>
                );
            }}
        </FieldContext.Consumer>
    );
}

type FileDownloadProps<T extends Entity> = FieldProps<T> & {
    onDownload?: (documentId: number) => void,
    iconType?: 'PDF' | 'CSV'
};

function handleProps<T extends Entity>(props: FileDownloadProps<T>) {

    // TODO: in p bisognerebbe copiare solo quanto proveniente dai FieldProps
    let p: any = { ...props };
    p.ControlProps = p.ControlProps || { ...props };

    return p;
}

export function FileDownloadField<T extends Entity>(props: FileDownloadProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, OutlinedFieldImplementation, FileDownloadControl);
}