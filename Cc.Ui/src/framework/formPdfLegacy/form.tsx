import * as React from 'react';
import { Document } from 'react-pdf';
import { PDFPageProxy, PDFDocumentProxy } from 'pdfjs-dist';
import { Theme } from '@mui/material';
import { StyleRulesCallback, withStyles } from '@mui/styles'
import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import { FieldDefinition, getPageFields, augmentDefinitionFromComponent, entityMetadataFromFieldDefinition } from './utils';
import Page from './page';
//import MomentUtils from '@date-io/moment';
import { EntityUtils, Validation } from '../entity';
import { ListUtils } from '../utils';
//import { MuiPickersUtilsProvider } from '@mui/lab';
import { Fab } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.305/pdf.worker.js';
import itLocale from "date-fns/locale/it";

const styles: StyleRulesCallback<Theme, {}> = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // height: 'calc(100vh - 64px)',
        width: '100%',
        backgroundColor: '#555',
        justifyContent: 'center',
        fontSize: '14px',
        fontFamily: 'monospace'
    },
    header: {
    },
    container: {
        display: 'flex',
        flex: 1,
        width: '100%'
    },
    code: {
        margin: 30,
        overflowX: 'hidden',
        maxWidth: '300px',
        flex: 1,
        color: 'rgba(255, 255, 255,  0.8)'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '0px'
    },
    overflowContainer: {
        display: 'flex',
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden', // il document occupa molto spazio in larghezza se non facessi così avrei lo scroll laterale (molot brutto)
        padding: '16px'
        // justifyContent: 'center' as JustifyContentProperty
    },
    document: {
        margin: 'auto'
    },
    footer: {
    },
    zoomIn: {
        position: 'fixed',
        right: 40, 
        bottom: 40,
        height: 40,
        width: 40,
        [theme.breakpoints.down('sm')]: {
            right: 20,
            bottom: 20
        }
    },
    zoomOut: {
        position: 'fixed', 
        right: 40, 
        bottom: 100,
        height: 40,
        width: 40,
        [theme.breakpoints.down('sm')]: {
            right: 20,
            bottom: 80
        }
    }
});

export type FormProps<T> = {

    item: T;
    pdfUrl: string;
    configUrl?: string;
    debug?: boolean;
    // Non lo utilizzo perchè mi causerebbe il re-rendering di tutta la pagina ad ogni singola modifica di un campo
    // Poichè l'item viene passato per riferimento le modifiche fatte dai controlli vengono già riportate in esso
    // Il fatto che il Field sia una classe e dentro l' onValueChanged eseguo già un setState, mi assicura il re-rendering del solo Field
    handleChange?: (item: T) => void;
    onInit?: (form: any) => void; // mi va in loop

    classes: any;
    style?: any;

    children?: any;
    ref?: any;
}

export type FormContext<T> = {
    item: T;
    pages: Array<PDFPageProxy>;
    scale: number;
    defs: FieldDefinition[];
    validation?: Validation<T>;
    handleChange?: (item: T) => void;    
    debug: boolean;
}

export const FormContext = React.createContext<FormContext<any>>({} as any);

type FormState<T> = {
    scale: number;
    pages: PDFPageProxy[];
    defs: FieldDefinition[];
    validation?: Validation<T>;
}

class Form<T> extends React.Component<FormProps<T>, FormState<T>> {

    state: FormState<T> = {
        scale: 1.5,
        pages: [],
        defs: []
    };

    /*static getDerivedStateFromProps(nextProps: any, prevState: any) {

        if (nextProps.validationDate !== prevState.validationDate) {
            return {
                validationDate: 1
            };
        }

        return null;
    }*/

    onDocumentLoadSuccess = async (pdf: PDFDocumentProxy) => {
        
        let pages: Array<PDFPageProxy> = [];
        let defs: FieldDefinition[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
            let page = await pdf.getPage(i);
            pages.push(page);
        }        

        if (this.props.configUrl) {

            let response = await fetch(this.props.configUrl);
            defs = await response.json();

            if (this.props.debug) {
                console.log(`Loading fields definition from ${this.props.configUrl}`, defs);
            }
        } else {

            if (this.props.debug) {
                console.log(`Loading fields definition from pages`);
            }

            for (let i = 0; i < pages.length; i++) {
                let pageDefs = await getPageFields(pages[i]);                
                defs = [...defs, ...pageDefs];

                if (this.props.debug) {
                    console.log(`Page ${i + 1} fields definition`, pageDefs);
                }
            }
        }

        // integro le informazioni codicate nei field (TSX) con quanto letto dalle annotations del pdf
        let augmentedDefs = [...defs];
        if (this.props.children !== undefined) {   

            for (let i = 0; i < this.props.children.length; i++) {

                let pageControl = this.props.children[i];
                if (pageControl.props.children !== undefined) {

                    for (let j = 0; j < pageControl.props.children.length; j++) {

                        let child = pageControl.props.children[j];
                        ListUtils.addOrReplace(
                            augmentedDefs, 
                            x => x.name === child.props.name, 
                            augmentDefinitionFromComponent(child, augmentedDefs.find((x: any) => x.name === child.props.name), pageControl.props.num)
                        );
                    }
                }
            }

            if (this.props.debug) {
                console.log('Augmented field definition from componenet', augmentedDefs);
            }
        }

        let validation =  new Validation(this.props.item, entityMetadataFromFieldDefinition(augmentedDefs));

        if (this.props.onInit !== undefined) {
            this.props.onInit(this);
        }

        this.setState({
            pages,
            defs: augmentedDefs,
            validation
        });
    }

    zoomIn = (e: any): void => {

        this.setState((prevState: any) => {
            return {
                scale: prevState.scale + 0.25
            };
        });
    }

    zoomOut = (e: any): void => {

        this.setState((prevState: any) => {
            return {
                scale: prevState.scale - 0.25
            };
        });
    }

    validate = () => {
        return this.state.validation!.validate();
    }

    render() {

        let { item, handleChange, classes, children, pdfUrl, debug } = this.props;
        let { scale, defs, validation } = this.state;
        let pages: PDFPageProxy[] = this.state.pages;

        return (
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={itLocale}>
                <FormContext.Provider
                    value={{
                        item,
                        handleChange,
                        pages,
                        scale,
                        defs,
                        validation,
                        debug: debug || false
                    }}
                >
                    <div className={classes.root}>
                        <div className={classes.container}>
                            {debug === true && item !== undefined ? (
                                <div>
                                    <pre className={classes.code}>{JSON.stringify(EntityUtils.isEntity(item) ? EntityUtils.asObject(item) : item, null, 2)}</pre>                    
                                </div>
                            ) : null}                        
                            <div className={classes.content}>
                                <div className={classes.overflowContainer}>
                                    {document !== undefined ? (
                                        <Document
                                            className={classes.document}
                                            error="Ooops, there was an error loading document!"
                                            onLoadSuccess={this.onDocumentLoadSuccess} 
                                            renderMode="svg"
                                            file={pdfUrl}
                                        >
                                            {children !== undefined ? children
                                            : pages !== undefined ? pages!.map((x: PDFPageProxy, index: number) => <Page key={index} num={x.pageNumber} />) 
                                            : null}
                                        </Document>
                                    ) : null}
                                </div>
                            </div>                    
                            <div className={classes.footer}>
                                <Fab className={classes.zoomIn} onClick={this.zoomIn}><PlusIcon /></Fab>
                                <Fab className={classes.zoomOut} onClick={this.zoomOut}><MinusIcon /></Fab>                    
                            </div>
                        </div>
                    </div>
                </FormContext.Provider>
            </LocalizationProvider>
        );
    }
}

export default withStyles(styles)(Form);