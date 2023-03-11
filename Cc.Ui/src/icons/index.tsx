import React from 'react';
import SignedDocument from './signed_document.svg';
import Document from './document.svg';
import ErrorDocument from './error_document.svg';
import DownloadDocument from './download_document.svg';
import PdfDocument from './pdf.svg';
//import { ReactComponent as ComposingDocument } from './composing_document.svg';
import ComposingDocument from './composing_document.svg';
import Dot from './dot.svg';
import  CsvDocument from './csv.svg';
import  CreateDossier  from './wf/create_dossier.svg';
import  AutomaticSign from './wf/automatic_sign.svg';
import  ChooseSigners  from './wf/choose_signers.svg';
import  CreateReasons  from './wf/create_reasons.svg';
import  CompleteDossier  from './wf/complete_dossier.svg';
import  DocumentComposition  from './wf/document_composition.svg';
import  EngageTop  from './wf/engage_top.svg';
import  SelfIdentification  from './wf/selfie.svg';
import  LegalArchiving  from './wf/legal_archiving.svg';
import  SelectProduct  from './wf/select_product.svg';
import  UploadDocument  from './wf/upload_document.svg';
import  CheckIdentificationDocuments  from './wf/check_identification_documents.svg';
import  BackgroundTask  from './wf/background_task.svg';
import { isNumber } from 'lodash';
import { makeStyles } from '@mui/styles';
import clsx from 'classnames';
import { createTheme } from '@mui/material';

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        cursor: 'pointer'
    },
    disabled: {
        filter: 'grayscale(100%)',
        opacity: 0.5
    }
})

type Props = {    
    width?: number,
    height?: number,
    size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    disabled?: boolean;
    style?: any;
    onClick?: () => void;
}

type InnerProps = Props & {
    SvgIcon: any
}

function Icon({ SvgIcon, width, height, size, disabled, style, onClick}: InnerProps) {

    const classes = useStyles();

    if (size) {
        let dim: number;
        switch (size) {
            case 'xs':
                dim = 24; break;
            case 'sm':
                dim = 32; break;
            case 'md':
                dim = 48; break;
            case 'lg':
                dim = 64; break;
            case 'xl':
                dim = 96; break;
            default:
                dim = isNumber(size) ? size : 32;
        }

        width = dim;
        height = dim;
    }

    style = style || {};
    style= {
        ...style,
        width: width ?? 32,
        height: height ?? 32
    }

    return (
        <SvgIcon 
            style={style}
            className={clsx({
                [classes.root]: true,
                [classes.disabled]: disabled
            })}
            onClick={onClick}
        />
    );
}

export const Icons = {
    Document: (props?: Props) => <Icon {...props} SvgIcon={Document} />,
    SignedDocument: (props?: Props) => <Icon {...props} SvgIcon={SignedDocument} />,
    ErrorDocument: (props?: Props) => <Icon {...props} SvgIcon={ErrorDocument} />,
    PdfDocument: (props?: Props) => <Icon {...props} SvgIcon={PdfDocument} />,
    Dot: (props?: Props) => <Icon {...props} SvgIcon={Dot} />,
    ComposingDocument: (props?: Props) => <Icon {...props} SvgIcon={ComposingDocument} />,
    CsvDocument: (props?: Props) => <Icon {...props} SvgIcon={CsvDocument} />,
    DownloadDocument: (props?: Props) => <Icon {...props} SvgIcon={DownloadDocument} />,
    // ConfirmDocument: (props?: Props) => <Icon {...props} SvgIcon={ConfirmDocument} />,
    // UploadDocument: (props?: Props) => <Icon {...props} SvgIcon={UploadDocumentOld} />,
    // UserDocument: (props?: Props) => <Icon {...props} SvgIcon={UserDocument} />,
    // AwardDocument: (props?: Props) => <Icon {...props} SvgIcon={AwardDocument} />,
    // ShareDocument: (props?: Props) => <Icon {...props} SvgIcon={ShareDocument} />,
    // LockDocument: (props?: Props) => <Icon {...props} SvgIcon={LockDocument} />,
    // SearchDocument: (props?: Props) => <Icon {...props} SvgIcon={SearchDocument} />,
}

export const WorkflowIcons = {
    CreateDossier:  (props?: Props) => <Icon {...props} SvgIcon={CreateDossier} />,
    AutomaticSign: (props?: Props) => <Icon {...props} SvgIcon={AutomaticSign} />,
    ChooseSigners: (props?: Props) => <Icon {...props} SvgIcon={ChooseSigners} />,
    CompleteDossier: (props?: Props) => <Icon {...props} SvgIcon={CompleteDossier} />,
    CreateReasons: (props?: Props) => <Icon {...props} SvgIcon={CreateReasons} />,
    DocumentComposition: (props?: Props) => <Icon {...props} SvgIcon={DocumentComposition} />,
    SelfIdentification: (props?: Props) => <Icon {...props} SvgIcon={SelfIdentification} />,
    EngageTop: (props?: Props) => <Icon {...props} SvgIcon={EngageTop} />,
    LegalArchiving: (props?: Props) => <Icon {...props} SvgIcon={LegalArchiving} />,
    SelectProduct: (props?: Props) => <Icon {...props} SvgIcon={SelectProduct} />,
    UploadDocument: (props?: Props) => <Icon {...props} SvgIcon={UploadDocument} />,
    CheckIdentificationDocuments: (props?: Props) => <Icon {...props} SvgIcon={CheckIdentificationDocuments} />,
    BackgroundTask:(props?: Props) => <Icon {...props} SvgIcon={BackgroundTask} />,
}