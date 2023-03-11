import { LookupKey } from '../core/lookup';

export const cache = async (key: LookupKey, id: string | number) => {
    
    if (id === undefined || id === null || id === '' || id === 0) {
        return;
    }

    // hack per evitare TDZ
    let storeModule: any = await import('./store');
    let { lookup } = storeModule.default.getState();
    // let dispatch = store.dispatch;

    switch (key) {
        case 'PRODUCT': {
            return lookup.products.find((x: any) => x.id === id);
        }
        case 'COMPANY': {
            return lookup.companies.find((x: any) => x.id === id);
        }
        case 'AGENCY': {
            return lookup.agencies.find((x: any) => x.id === id);
        }
        case 'CONFIGURATION': {
            return lookup.configurations.find((x: any) => x.id === id);
        }
        case 'CATEGORY': {
            return lookup.categories.find((x: any) => x.id === id);
        }
        case 'WAREHOUSE_TYPE': {
            return lookup.warehouseTypes.find((x: any) => x.id === id);
        }
        case 'TAB_COUNTRY': {
            return lookup.countries.find((x: any) => x.id === id);
        }
        case 'TAB_DISTRICT': {
            return lookup.districts.find((x: any) => x.id === id);
        }
        case 'TAB_REGION': {
            return lookup.regions.find((x: any) => x.id === id);
        }
        case 'BROADCASTING': {
            return lookup.broadcastings.find((x: any) => x.id === id);
        }
        case 'COMMISSION': {
            return lookup.commissions.find((x: any) => x.id === id);
        }
        default:
            return undefined;
    }
};
//#endregion