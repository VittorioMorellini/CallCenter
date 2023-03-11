import { combineReducers } from 'redux';
//import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { appReducer, AppState } from '../app/core/reducer';
import { documentReducer, DocumentState } from '../core/document';
import { principalReducer, PrincipalState } from '../core/principal';
import { productReducer, ProductState } from '../core/product';
import { serviceReducer, ServiceState } from './services';
import { companyReducer, CompanyState } from '../core/company';
import { agencyReducer, AgencyState } from '../core/agency';
import { lookupReducer, LookupState } from '../core/lookup';
import { principalAuthReducer, PrincipalAuthState } from '../core/principalAuth';
import { configurationReducer, ConfigurationState } from '../core/configuration';
import { tabCountryReducer, TabCountryState } from '../core/tabCountry';
import { tabCityReducer, TabCityState } from '../core/tabCity';
import { tabDistrictReducer, TabDistrictState } from '../core/tabDistrict';
import { tabRegionReducer, TabRegionState } from '../core/tabRegion';
import { regionReducer, RegionState } from '../core/region';
import { customerReducer, CustomerState } from '../core/customer';
import { customerCallReducer, CustomerCallState } from '../core/customerCall';
import { principalTabRegionReducer, PrincipalTabRegionState } from '../core/principalTabRegion';
import { broadcastingReducer, BroadcastingState } from '../core/broadcasting';
import { broadcastingProductReducer, BroadcastingProductState } from '../core/broadcastingProduct';
import { broadcastingTabRegionReducer, BroadcastingTabRegionState } from '../core/broadcastingTabRegion';
import { categoryReducer, CategoryState } from '../core/category';
import { investmentReducer, InvestmentState } from '../core/investment';
import { measureReducer, MeasureState } from '../core/measure';
import { eventTypeReducer, EventTypeState } from '../core/eventType';
import { warehouseTypeReducer, WarehouseTypeState } from '../core/warehouseType';
import { warehouseReducer, WarehouseState } from '../core/warehouse';
import { commissionReducer, CommissionState } from '../core/commission';
import { appointmentReducer, AppointmentState } from '../core/appointment';
import { appointmentEndingReducer, AppointmentEndingState } from '../core/appointmentEnding';
import { appointmentRejectReducer, AppointmentRejectState } from '../core/appointmentReject';
import { appointmentTypeReducer, AppointmentTypeState } from '../core/appointmentType';

export interface RootState {
    //oidc: UserState;    
    app: AppState;
    lookup: LookupState;
    agency: AgencyState;
    appointment: AppointmentState;
    appointmentEnding: AppointmentEndingState;
    appointmentReject: AppointmentRejectState;
    appointmentType: AppointmentTypeState;
    company: CompanyState;
    configuration: ConfigurationState;
    document: DocumentState,
    region: RegionState,
    service: ServiceState;
    customer: CustomerState;
    customerCall: CustomerCallState;
    category: CategoryState;
    commission: CommissionState;
    broadcasting: BroadcastingState;
    broadcastingProduct: BroadcastingProductState;
    broadcastingTabRegion: BroadcastingTabRegionState;
    eventType: EventTypeState;
    investment: InvestmentState;
    measure: MeasureState;
    principal: PrincipalState;
    principalAuth: PrincipalAuthState;
    principalTabRegion: PrincipalTabRegionState;
    product: ProductState;
    tabCity: TabCityState;
    tabCountry: TabCountryState;
    tabDistrict: TabDistrictState;
    tabRegion: TabRegionState;
    warehouseType: WarehouseTypeState;
    warehouse: WarehouseState;
}

export const root = combineReducers<RootState>({
    //oidc: oidcReducer,
    app: appReducer,
    lookup: lookupReducer,
    agency: agencyReducer,
    appointment: appointmentReducer,
    appointmentEnding: appointmentEndingReducer,
    appointmentReject: appointmentRejectReducer,
    appointmentType: appointmentTypeReducer,
    company: companyReducer,
    configuration: configurationReducer,
    document: documentReducer,
    region: regionReducer,
    service: serviceReducer,
    broadcasting: broadcastingReducer,
    broadcastingProduct: broadcastingProductReducer,
    broadcastingTabRegion: broadcastingTabRegionReducer,
    customer: customerReducer,
    customerCall: customerCallReducer,
    category: categoryReducer,
    commission: commissionReducer,
    eventType: eventTypeReducer,
    investment: investmentReducer,
    measure: measureReducer,
    principal: principalReducer,
    principalAuth: principalAuthReducer,
    principalTabRegion: principalTabRegionReducer,
    product: productReducer,
    tabCountry: tabCountryReducer,
    tabCity: tabCityReducer,
    tabDistrict: tabDistrictReducer,
    tabRegion: tabRegionReducer,
    warehouseType: warehouseTypeReducer,
    warehouse: warehouseReducer,
});
