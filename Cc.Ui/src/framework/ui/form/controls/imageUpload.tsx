import React, { useEffect } from 'react';
import { FieldContext, FieldProps, fieldWithImplementationControl } from '../../../form';
import { Entity } from '../../../entity';
import { OutlinedFieldImplementation } from '../field';
import { Theme, Badge, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import clsx from 'classnames';
import { BrowserUtils, ImageUtils, guid } from '../../../utils';
import { UploadFile } from '../types';
import { Confirm } from '../..';
import { useState } from 'react';
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

export function ImageUploadControl<T extends Entity>(props: ImageUploadProps<T>) {

    const classes = useStyles();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [image, setImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.setImageDataUrl) {
            props.setImageDataUrl().then(data => data && data.length > 0 ? setImage(data) : null)
        }
    }, [])

    const { getRootProps, getInputProps, isDragReject, isDragAccept, isDragActive } = useDropzone({
        accept: props.accept ?? undefined,
        onDrop: (files, rf) => {

            let f = files[0];
            BrowserUtils.convertFileToBase64(f).then((data: string) => {

                ImageUtils.resize(data, f.type, (resized: string) => {

                    let item: UploadFile = {
                        name: f.name,
                        type: f.type,
                        fileEncoded: resized,
                        guid: guid()   
                    };
    
                    if(props.onUpload)
                        props.onUpload(item);

                    let fileUri = ImageUtils.fromBase64ToDataUrl(resized, 'png');
                    setImage(fileUri);
                }, 240);
            });
        }
    });

    const displayControl = (documentId: number) => {
        let control = image ? (
            <div style={{overflow: 'auto'}}>
                <img src={image} style={{maxWidth: 240}} /> 
            </div>
        ) : null;

        if (props.onDelete) {
            control = (
                <Badge
                    color="error"
                    badgeContent="X" 
                    onClick={(e: React.MouseEvent) => { 
                        setIsDeleteDialogOpen(true);
                        e.stopPropagation();
                    }}
                >{control}</Badge>
            )
        }
        return <div className={classes.file}>{control}</div>;
    }

    const uploadControl = () => (
        <div
            className={clsx(classes.dropzone,
                isDragActive && classes.dragActive,
                isDragAccept && classes.dragAccept,
                isDragReject && classes.dragReject)}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <Typography variant="body1">Trascina il file qui o clicca per caricarlo</Typography>
        </div>
    )

    return (
        <FieldContext.Consumer>
            {(field: FieldContext<T>) => {

                let value = field.value;

                return (
                    <div className={classes.root}>
                        {value ? displayControl(value) : uploadControl()}
                        <Confirm
                            open={isDeleteDialogOpen}
                            onCancel={() => setIsDeleteDialogOpen(false)}
                            onConfirm={() => {
                                if (props.onDelete){
                                    props.onDelete(value);
                                    setImage(undefined);
                                }
                                setIsDeleteDialogOpen(false);
                            }}
                        />
                    </div>
                );
            }}
        </FieldContext.Consumer>
    );
}

type ImageUploadProps<T extends Entity> = FieldProps<T> & {
    accept?: string,
    setImageDataUrl?: () => Promise<string>,
    onUpload?: (item: UploadFile) => void,
    onDownload?: (documentId: number) => void,
    onDelete?: (documentId: number) => void
};

function handleProps<T extends Entity>(props: ImageUploadProps<T>) {

    // TODO: in p bisognerebbe copiare solo quanto proveniente dai FieldProps
    let p: any = { ...props };
    p.ControlProps = p.ControlProps || { ...props };

    return p;
}

export function ImageUploadField<T extends Entity>(props: ImageUploadProps<T>) {

    let p = handleProps(props);

    return fieldWithImplementationControl(p, OutlinedFieldImplementation, ImageUploadControl);
}