import { Reducer } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import typeToReducer from 'type-to-reducer';
import { RootState } from '../../app/reducers';
import { api } from '../../framework/core/logic';
import { useLogger } from '../../framework/logger';
import _ from 'lodash';
import { ListUtils } from '../../framework/utils';
import { Action } from '../../framework/core/types';
import { Agency, Broadcasting, Category, Company, Configuration, Product, TabCity, TabCountry, TabDistrict, TabRegion, WarehouseType, Commission } from '../../models';

export enum LookupKey {
    PRODUCT = 'PRODUCT',
    CATEGORY = 'CATEGORY',
    COMPANY = 'COMPANY',
    AGENCY = 'AGENCY',
    CONFIGURATION = 'CONFIGURATION',
    COMMISSION = 'COMMISSION',
    TAB_DISTRICT = 'TAB_DISTRICT',
    TAB_COUNTRY = 'TAB_COUNTRY',
    TAB_CITY = 'TAB_CITY',
    TAB_REGION = 'TAB_REGION',
    BROADCASTING = 'BROADCASTING',
    WAREHOUSE_TYPE = 'WAREHOUSE_TYPE',
}

const K = {
    ADD_OR_REPLACE: 'LOOKUP/ADD_OR_REPLACE',
    PRODUCT: 'LOOKUP/PRODUCT',
    CATEGORY: 'LOOKUP/CATEGORY',
    COMPANY: 'LOOKUP/COMPANY',
    AGENCY: 'LOOKUP/AGENCY',
    CONFIGURATION: 'LOOKUP/CONFIGURATION',
    COMMISSION: 'LOOKUP/COMMISSION',
    TAB_DISTRICT: 'LOOKUP/TAB_DISTRICT',
    TAB_COUNTRY: 'LOOKUP/TAB_COUNTRY',
    TAB_CITY: 'LOOKUP/TAB_CITY',
    TAB_REGION: 'LOOKUP/TAB_REGION',
    BROADCASTING: 'LOOKUP/BROADCASTING',
    WAREHOUSE_TYPE: 'LOOKUP/WAREHOUSE_TYPE',
};

export const useLookupActions = () => {

    const dispatch = useDispatch<any>();
    const logger = useLogger({ key: 'LOOKUP' });
    const state = useSelector((root: RootState) => root);

    const actions = {
        addOrReplace: (key: LookupKey, item: any) => <Action>{
            type: K.ADD_OR_REPLACE,
            key,
            item
        },
        product: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.PRODUCT,
                logger,
                dispatch,
                state.service.product.search(model)
            );
        },
        company: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.COMPANY,
                logger,
                dispatch,
                state.service.company.search(model)
            );
        },
        agency: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.AGENCY,
                logger,
                dispatch,
                state.service.agency.search(model)
            );
        },
        configuration: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.CONFIGURATION,
                logger,
                dispatch,
                state.service.configuration.search(model)
            );
        },
        commission: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.COMMISSION,
                logger,
                dispatch,
                state.service.commission.search(model)
            );
        },
        tabDistrict: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.TAB_DISTRICT,
                logger,
                dispatch,
                state.service.tabDistrict.search(model)
            );
        },
        tabCity: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.TAB_CITY,
                logger,
                dispatch,
                state.service.tabCity.search(model)
            );
        },
        tabCountry: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.TAB_COUNTRY,
                logger,
                dispatch,
                state.service.tabCountry.search(model)
            );
        },
        tabRegion: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.TAB_REGION,
                logger,
                dispatch,
                state.service.tabRegion.search(model)
            );
        },
        category: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.CATEGORY,
                logger,
                dispatch,
                state.service.category.search(model)
            );
        },
        broadcasting: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.BROADCASTING,
                logger,
                dispatch,
                state.service.broadcasting.search(model)
            );
        },
        warehouseType: (): Promise<any> => {
            let model: any = {};
            return api(model)(
                K.WAREHOUSE_TYPE,
                logger,
                dispatch,
                state.service.warehouseType.search(model)
            );
        },
    }

    return {
        actions,
        logger
    };
}

export interface LookupState {
    products: Product[];
    companies: Company[];
    agencies: Agency[];
    configurations: Configuration[];
    countries: TabCountry[];
    districts: TabDistrict[];
    cities: TabCity[];
    regions: TabRegion[]
    categories: Category[]
    broadcastings: Broadcasting[]
    warehouseTypes: WarehouseType[]
    commissions: Commission[]
}

const initialState: LookupState = {
    products: [],
    companies: [],
    agencies: [],
    configurations: [],
    countries: [],
    districts: [],
    cities: [],
    regions: [],
    categories: [],
    broadcastings: [],
    warehouseTypes: [],
    commissions: []
};

function addOrReplace(state: LookupState, key: string, item: any): Partial<LookupState> {

    switch (key) {
        case LookupKey.PRODUCT:
            return { products: ListUtils.addOrReplace(state.products, x => x.id === item.id, item) }
        case LookupKey.COMPANY:
            return { companies: ListUtils.addOrReplace(state.companies, x => x.id === item.id, item) }
        case LookupKey.AGENCY:
            return { agencies: ListUtils.addOrReplace(state.agencies, x => x.id === item.id, item) }
        case LookupKey.CONFIGURATION:
            return { configurations: ListUtils.addOrReplace(state.configurations, x => x.id === item.id, item) }
        case LookupKey.BROADCASTING:
            return { broadcastings: ListUtils.addOrReplace(state.broadcastings, x => x.id === item.id, item) }
        case LookupKey.CATEGORY:
            return { categories: ListUtils.addOrReplace(state.categories, x => x.id === item.id, item) }
        case LookupKey.COMMISSION:
            return { commissions: ListUtils.addOrReplace(state.commissions, x => x.id === item.id, item) }
        case LookupKey.WAREHOUSE_TYPE:
            return { warehouseTypes: ListUtils.addOrReplace(state.warehouseTypes, x => x.id === item.id, item) }
        default:
            throw new Error(`${key} not found`)
    }

}

export const lookupReducer: Reducer<LookupState, any> = typeToReducer({
    [K.ADD_OR_REPLACE]: (state: LookupState, { key, item }) => ({
        ...state,
        ...addOrReplace(state, key, item)
    }),
    [K.PRODUCT]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            products: payload
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            products: []
        })
    },
    [K.COMPANY]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            companies: payload
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            companies: []
        })
    },
    [K.AGENCY]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            agencies: payload
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            agencies: []
        })
    },
    [K.CONFIGURATION]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            configurations: payload
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            configurations: []
        })
    },
    [K.COMMISSION]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            commissions: payload
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            commissions: []
        })
    },
    [K.TAB_COUNTRY]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            countries: payload,
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            countries: []
        })
    },
    [K.TAB_DISTRICT]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            districts: payload,
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            districts: []
        })
    },
    [K.TAB_CITY]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            cities: payload,
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            cities: []
        })
    },
    [K.TAB_REGION]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            regions: payload,
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            regions: []
        })
    },
    [K.CATEGORY]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            categories: payload,
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            categories: []
        })
    },
    [K.BROADCASTING]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            broadcastings: payload,
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            broadcastings: []
        })
    },
    [K.WAREHOUSE_TYPE]: {
        SUCCESS: (state: LookupState, { payload }) => ({
            ...state,
            warehouseTypes: payload,
        }),
        FAILURE: (state: LookupState) => ({
            ...state,
            warehouseTypes: []
        })
    },
}, initialState);
