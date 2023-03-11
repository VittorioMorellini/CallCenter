import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

export type FieldDefinition = {
    name: string;
    type: string;
    rect: number[];
    page: number;
}

export const getDocumentFieldDefinitions = async (pdf: PDFDocumentProxy) => {
    
    let pages: Array<PDFPageProxy> = [];
    let fields: FieldDefinition[] = []
    for (let i = 1; i <= pdf.numPages; i++) {
        let page = await pdf.getPage(i);
        pages.push(page);

        fields.push(...await getPageFieldDefinitions(page));
    }

    // console.log(fields);

    return fields;
}

export async function getPageFieldDefinitions(page: PDFPageProxy) {

    let fields: Array<FieldDefinition> = [];

    let annotations = await page.getAnnotations();
    (annotations as any)
        .filter((a: any) => a.subtype === 'Widget')
        .sort((a: any, b: any) => a.fieldName < b.fieldName ? -1 : a.fieldName > b.fieldName ? 1 : 0)
        .forEach((a: any, index: number) => {   

            let field: FieldDefinition = {
                name: a.fieldName,
                type: a.fieldType,
                rect: a.rect,
                page: page.pageNumber
            };

            fields.push(field);
        });
        
    return fields;
}