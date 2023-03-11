import * as BrowserUtils from './browser';
import * as ColorUtils from './color';
import * as DateUtils from './date';
import * as ListUtils from './list';
import * as PropertyUtils from './property';
import * as StringUtils from './string';
import * as PdfUtils from './pdf';
import * as ImageUtils from './image';
import metadata from './metadata';
import * as uuid from 'uuid';
import { CodiceFiscale } from './codiceFiscale';

export {
    BrowserUtils,
    ColorUtils,
    DateUtils,
    ListUtils,
    PropertyUtils,
    StringUtils,
    PdfUtils,
    ImageUtils,
    CodiceFiscale,
    metadata
}

export function guid(): string {
    return uuid.v4();
}