import { Reducer } from 'redux';
import typeToReducer from 'type-to-reducer';
import { PrincipalService } from '../core/principal/service';
import { ProductService } from '../core/product/service';
import { IdentityService } from '../app/core/identity/service';
import store from './store';
import { DocumentService } from '../core/document/service';
import { CompanyService } from '../core/company/service';
import { AgencyService } from '../core/agency/service';
import { PrincipalAuthService } from '../core/principalAuth/service';
import { ConfigurationService } from '../core/configuration/service';
import { TabCountryService } from '../core/tabCountry/service';
import { TabCityService } from '../core/tabCity/service';
import { TabDistrictService } from '../core/tabDistrict/service';
import { TabRegionService } from '../core/tabRegion/service';
import { RegionService } from '../core/region/service';
import { CustomerService } from '../core/customer/service';
import { CategoryService } from '../core/category/service';
import { CustomerCallService } from '../core/customerCall/service';
import { CustomerRequiredFieldService } from '../core/customerRequiredField/service';
import { PrincipalTabRegionService } from '../core/principalTabRegion/service';
import { BroadcastingService } from '../core/broadcasting/service';
import { BroadcastingProductService } from '../core/broadcastingProduct/service';
import { BroadcastingTabRegionService } from '../core/broadcastingTabRegion/service';
import { InvestmentService } from '../core/investment/service';
import { MeasureService } from '../core/measure/service';
import { EventTypeService } from '../core/eventType/service';
import { WarehouseTypeService } from '../core/warehouseType/service';
import { WarehouseService } from '../core/warehouse/service';
import { CommissionService } from '../core/commission/service';
import { AppointmentService } from '../core/appointment/service';
import { AppointmentEndingService } from '../core/appointmentEnding/service';
import { AppointmentRejectService } from '../core/appointmentReject/service';
import { AppointmentTypeService } from '../core/appointmentType/service';

export interface ServiceState {
    agency: AgencyService;
    appointment: AppointmentService;
    appointmentEnding: AppointmentEndingService;
    appointmentReject: AppointmentRejectService;
    appointmentType: AppointmentTypeService;
    company: CompanyService;
    configuration: ConfigurationService;
    document: DocumentService;
    identity: IdentityService;
    principal: PrincipalService;
    customer: CustomerService;
    customerCall: CustomerCallService;
    category: CategoryService;
    commission: CommissionService;
    eventType: EventTypeService;
    investment: InvestmentService;
    measure: MeasureService;
    broadcasting: BroadcastingService;
    broadcastingProduct: BroadcastingProductService;
    broadcastingTabRegion: BroadcastingTabRegionService;
    customerRequiredField: CustomerRequiredFieldService;
    principalAuth: PrincipalAuthService;
    principalTabRegion: PrincipalTabRegionService;
    product: ProductService;
    region: RegionService;
    tabCountry: TabCountryService;
    tabCity: TabCityService;
    tabDistrict: TabDistrictService;
    tabRegion: TabRegionService;
    warehouseType: WarehouseTypeService;
    warehouse: WarehouseService;
}

const getAccessToken = () => {
    try {
        let state = store.getState();
        //TODO
        //return state.app.user !== undefined ? state.app.user.access_token : '';
        return ''
    } catch {
        return '';
    }
};

const getCustomHeaders = () => {

    let map = new Map<string, string>();
    try {
        // map.set('sx-auth-id', store.getState().auth.identity.identity.idPrincipal.toString());
    } catch {
        // throw new Error('getCustomHeaders failed');
    }

    return map;
};

export const serviceReducer: Reducer<ServiceState, any> = typeToReducer({}, {
    agency: new AgencyService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    appointment: new AppointmentService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    appointmentEnding: new AppointmentEndingService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    appointmentReject: new AppointmentRejectService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    appointmentType: new AppointmentTypeService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    company: new CompanyService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    configuration: new ConfigurationService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    document: new DocumentService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    identity: new IdentityService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    principal: new PrincipalService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    broadcasting: new BroadcastingService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    broadcastingProduct: new BroadcastingProductService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    broadcastingTabRegion: new BroadcastingTabRegionService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    customer: new CustomerService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    customerCall: new CustomerCallService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    customerRequiredField: new CustomerRequiredFieldService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    category: new CategoryService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    commission: new CommissionService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    eventType: new EventTypeService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    investment: new InvestmentService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    measure: new MeasureService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    principalAuth: new PrincipalAuthService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    principalTabRegion: new PrincipalTabRegionService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    product: new ProductService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    region: new RegionService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    tabCountry: new TabCountryService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    tabCity: new TabCityService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    tabDistrict: new TabDistrictService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    tabRegion: new TabRegionService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    warehouseType: new WarehouseTypeService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
    warehouse: new WarehouseService(process.env.REACT_APP_API_ENDPOINT || '', getAccessToken, getCustomHeaders),
});