export { Principal, PrincipalSearchModel, PrincipalUpload, PrincipalUploadResult } from './principal';
export { PrincipalAuth, PrincipalAuthSearchModel } from './principalAuth';
export { Product, ProductSearchModel } from './product';
export { LogError, LogErrorSearchModel } from './logError';
export { Document, DocumentSearchModel } from './document';
export { Company, CompanySearchModel } from './company';
export { Agency, AgencySearchModel } from './agency';
export { Configuration, ConfigurationSearchModel } from './configuration';
export { AuthenticateResponse} from './authenticateResponse'
export { TabCountry, TabCountrySearchModel } from './tabCountry';
export { TabCity, TabCitySearchModel } from './tabCity';
export { TabRegion, TabRegionSearchModel } from './tabRegion';
export { TabDistrict, TabDistrictSearchModel } from './tabDistrict';
export { Region, RegionSearchModel } from './region';
export { Customer, CustomerSearchModel } from './customer';
export { CustomerCall, CustomerCallSearchModel } from './customerCall';
export { CustomerRequiredField, CustomerRequiredFieldSearchModel } from './customerRequiredField';
export { PrincipalTabRegion, PrincipalTabRegionSearchModel } from './principalTabRegion';
export { Broadcasting, BroadcastingSearchModel } from './broadcasting';
export { BroadcastingProduct, BroadcastingProductSearchModel } from './broadcastingProduct';
export { BroadcastingTabRegion, BroadcastingTabRegionSearchModel } from './broadcastingTabRegion';
export { Category, CategorySearchModel } from './category';
export { Investment, InvestmentSearchModel } from './investment';
export { Measure, MeasureSearchModel } from './measure';
export { EventType, EventTypeSearchModel } from './eventType';
export { WarehouseType, WarehouseTypeSearchModel } from './warehouseType';
export { Warehouse, WarehouseSearchModel } from './warehouse';
export { Commission, CommissionSearchModel } from './commission';
export { Appointment, AppointmentSearchModel } from './appointment';
export { AppointmentEnding, AppointmentEndingSearchModel } from './appointmentEnding';
export { AppointmentReject, AppointmentRejectSearchModel } from './appointmentReject';
export { AppointmentType, AppointmentTypeSearchModel } from './appointmentType';

export class Roles {
    public static ADMIN: string = 'ADMIN';
    public static MANAGER: string = 'MANAGER'; //Capogruppo della Company
    public static SALESMAN: string = 'SALESMAN';
    public static OPERATOR: string = 'OPERATOR';  //Centralino
    public static LAWYER: string = 'LAWYER';  //Avvocato per il post vendita
    public static CUSTOMER: string = 'CUSTOMER';  //Cliente che magari vuole vedere i suoi ordini
}

export class CustomerTypes {
    public static CORPORATE: number = 0;
    public static PERSON: number = 1;
    //public static INTERNAL: number = 2;
}

export class IdentificationType {
    public static NONE: string = "NONE";
    public static SELF: string = "SELF";
}

export class TopCountryMode {
    public static DEFAULT: string = 'DEFAULT';
    public static ISO2: string = 'ISO2';
}

export class BroadcastingTypes {
    public static TvNazionale: string = "TVN";
    public static TvLocale: string = "TVL";
    public static Telemarketing: string = "TMK";
    public static Giornale: string = "GRN";
    public static WEB: string = "WEB";
}

export class PersonDetailModes {
    public static STANDARD: string = "STANDARD";
    public static EXTENDED: string = "EXTENDED";
}

export class InvestmentType {
    public static FIXED: string = "FIXED";
    public static ROYALTY: string = "ROYALTY";
}