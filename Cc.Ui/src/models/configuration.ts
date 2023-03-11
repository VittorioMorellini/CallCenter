import { Entity, resource, field, required, association } from '../framework/entity';
import { Pagination, Pager } from '../framework/core/actions';
import { cache } from '../app/cache';
import { LookupKey } from '../core/lookup';
import { Company } from './company';

@resource('configuration')
export class Configuration extends Entity {

    @field()
    id: number;
    @field()
    insertDate: string;
    @field()
    insertUser: string;
    @field()
    updateDate: string;
    @field()
    updateUser: string;
    @field()
    companyId: number;
    @field()
    legalBusUrl: string;
    @field()
    legalBusCompany: string;
    @field()
    legalBusUsername: string;
    @field()
    legalBusPassword: string;
    @field()
    legalBusStagingUrl: string;
    @field()
    legalBusStagingCompany: string;
    @field()
    legalBusStagingUsername: string;
    @field()
    legalBusStagingPassword: string;
    @field()
    topUrl: string;
    @field()
    topCompany: string;
    @field()
    topUsername: string;
    @field()
    topPassword: string;
    @field()
    topStagingUrl: string;
    @field()
    topStagingCompany: string;
    @field()
    topStagingUsername: string;
    @field()
    topStagingPassword: string;
    @field()
    uiLogoUrl: string;
    @field()
    uiLogoBackground: string;
    @field()
    uiLanguage: string;
    @field()
    uiHome: string;
    @field()
    uiColorPrimaryLight: string;
    @field()
    uiColorPrimaryMain: string;
    @field()
    uiColorPrimaryDark: string;
    @field()
    uiColorPrimaryContrastText: string;
    @field()
    uiColorSecondaryLight: string;
    @field()
    uiColorSecondaryMain: string;
    @field()
    uiColorSecondaryDark: string;
    @field()
    uiColorSecondaryContrastText: string;
    @field()
    retentionPolicy: number;
    @field()
    retentionPeriod: number;
    @field()
    retentionPeriodArchive: number;
    @field()
    principalMaxCount: number;
    @field()
    customerDefaultCountry: string;
    @field()
    customerDefaultPhonePrefix: string;
    @field()
    legalArchivingMode: string;
    @field()
    ftpServer: string;
    @field()
    ftpPort: string;
    @field()
    ftpOutputDir: string;
    @field()
    ftpUsername: string;
    @field()
    ftpPassword: string;
    @field()
    ftpInputDir: string;
    @field()
    ftpWorkingDir: string;
    @field()
    ftpDoneDir: string;
    @field()
    uiCustomerDetail: string;
    @field()
    topCountryMode: string;
    
    @association(Company, 'companyId', (id: string | number) => cache(LookupKey.COMPANY, id))
    company: Company;

    constructor(data?: any) {
        super()
        this.init(data);      
    }

    static newItem(): Configuration {
        let item = new Configuration();
        return item;
    }
}

@resource('configuration')
export class ConfigurationSearchModel extends Entity implements Pagination {
    
    @field()
    companyId?: number;
    @field()
    resolved?: boolean;

    @field()
    pager: Pager = <Pager> {
        take: 100,
        orderBy: 'id'
    };
}