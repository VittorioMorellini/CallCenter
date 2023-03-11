import * as React from 'react';
import { Page } from 'react-pdf';
import { FormContext } from './form';
import { FieldDefinition, renderFields } from './utils';
import { PDFPageProxy } from 'pdfjs-dist';
import { Entity } from '../entity';
import { ListUtils } from '../utils';

export interface PageContext {
    page: PDFPageProxy;
    defs: FieldDefinition[];
}

export const PageContext = React.createContext<PageContext>({} as any);

interface Props<T extends Entity> {

    num: number;
    scale: number;
    item: T;
    defs?: FieldDefinition[];
    page?: PDFPageProxy;

    children?: any;
}

class BasePage<T extends Entity> extends React.Component<Props<T>, any> {

    state = {
        // augmentedDefs: undefined, // mi serve per accedere alle regole di validazione scritte nel TSX
        // defs: undefined,
        // page: undefined,
        item: ''
    };

    // poiche l'eventuale caricamento della Page e delle FieldDefinition è asincrono devo aggiornare lo stato qualora arrivassero
    /*static getDerivedStateFromProps<T>(nextProps: Props<T>, prevState: any) {

        let s = {...prevState};
        if (nextProps.page !== undefined && nextProps.page !== prevState.page) {
            s = {
                ...s,
                page: nextProps.page
            };
        }

        if (nextProps.defs !== undefined && nextProps.defs !== prevState.defs) {

            s = {
                ...s,
                defs: nextProps.defs
            };
        } 

        if (prevState.augmentedDefs === undefined &&
            nextProps.children !== undefined && 
            s.page !== undefined && 
            s.defs !== undefined) {

            let augmentedDefs = [...s.defs];

            React.Children.forEach(nextProps.children, (child: any) => {
                ListUtils.addOrReplace(
                    augmentedDefs, 
                    x => x.name === child.props.name, 
                    augmentDefinitionFromComponent(child, s.defs.find((x: any) => x.name === child.props.name), s.page.pageNumber)
                );
            });

            s = {
                ...s,
                augmentedDefs
            };

            console.log('Augmented', augmentedDefs);
        }

        return s;
     }*/

    componentDidMount() {

        this.setState({
            item: this.props.item
        });
    }

    fieldsRendering() {

        let { scale, defs, page } = this.props;
        let { item } = this.state;

        if (defs === undefined || page === undefined) {
            return;
        }

        // preventivamente carico i fields a secondo delle definizioni
        let fields = renderFields(defs, page, scale, item);

        // qualora l'utente avesse eseguito un'override di queste come children diretto delle page, eseguo una sostituzione
        if (this.props.children !== undefined) {
            React.Children.forEach(this.props.children, (child: any) => {
                ListUtils.addOrReplace(fields, x => x.props.name === child.props.name, child);
            });
        }

        return (
            <PageContext.Provider
                value={{
                    defs,
                    page
                }}
            >
                <div style={{position: 'relative', zIndex: 1}}>
                    {fields}
                </div>   
            </PageContext.Provider>
        );
    }

    render() {

        let { num, scale } = this.props;

        return (
            <div style={{padding: '16px'}}>
                {this.fieldsRendering()}              
                <Page 
                    pageNumber={num} 
                    scale={scale}
                    renderAnnotationLayer={false} 
                    renderTextLayer={false} 
                />
            </div>            
        );
    }
}

interface PageFormProps {
    num: number;
    children?: any;
}

function PageWithForm<T extends Entity>(props: PageFormProps) {

    return (
        <FormContext.Consumer>
            {(form: FormContext<T>) => {
                let defs = form.defs !== undefined ? form.defs.filter(x => x.page === props.num) : undefined;
                let page = form.pages !== undefined ?  form.pages[props.num - 1] : undefined;
                return (
                    <BasePage 
                        {...props}
                        scale={form.scale}
                        item={form.item}
                        defs={defs}
                        page={page}
                    />
                );
            }}
        </FormContext.Consumer>
    );
}

export default PageWithForm;
