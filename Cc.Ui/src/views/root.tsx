import { Route, Routes } from 'react-router-dom';
import LoginView from '../app/views/login';
import PrincipalIndex from './principal';
import PrincipalDetail from './principal/detail';
import SettingsDetail from './principal/profile/settings';
import CompanyIndex from './company';
import CompanyDetail from './company/detail';
import AgencyIndex from './agency';
import AgencyDetail from './agency/detail';
import ConfigurationIndex from './configuration';
import ConfigurationDetail from './configuration/detail';
import CustomerIndex from './customer';
import CustomerDetail from './customer/detail';
import BroadcastingIndex from './broadcasting';
import BroadcastingDetail from './broadcasting/detail';
import ProductIndex from './product';
import ProductDetail from './product/detail';
import CategoryIndex from './category';
import CategoryDetail from './category/detail';
import InvestmentIndex from './investment';
import InvestmentDetail from './investment/detail';
import MeasureIndex from './measure';
import MeasureDetail from './measure/detail';
import EventTypeIndex from './eventType';
import EventTypeDetail from './eventType/detail';
import WarehouseTypeIndex from './warehouseType';
import WarehouseTypeDetail from './warehouseType/detail';
import WarehouseIndex from './warehouse';
import WarehouseDetail from './warehouse/detail';
import CommissionIndex from './commission';
import CommissionDetail from './commission/detail';
import AgendaIndex from './agenda';
import LayoutView from '../app/views/layout';

export const RootView = () => {
    
    let i = 0;
    // let routes = [
    //     <Route key={i++} path="/login" element={<LoginView />} />,
    // ];

    return (
        <Routes>
            {/*routes.map(x => x)*/}
            <Route key={i++} path="/login" element={<LoginView />} />,
            <Route element={<LayoutView />}>
                <Route key={i++} path="/" element={<PrincipalIndex />} />,       
                <Route key={i++} path="/principal" element={<PrincipalIndex />} />,
                <Route key={i++} path="/principal/:id" element={<PrincipalDetail />}  />,
                <Route key={i++} path="/company" element={<CompanyIndex />}  />,
                <Route key={i++} path="/company/:id" element={<CompanyDetail/>}  />,
                <Route key={i++} path="/agency" element={<AgencyIndex/>}  />,
                <Route key={i++} path="/agency/:id" element={<AgencyDetail/>} />,
                <Route key={i++} path="/configuration" element={<ConfigurationIndex/>} />,
                <Route key={i++} path="/configuration/:id" element={<ConfigurationDetail/>} />,
                <Route key={i++} path="/customer" element={<CustomerIndex/>} />,
                <Route key={i++} path="/customer/:id" element={<CustomerDetail/>} />,
                <Route key={i++} path="/broadcasting" element={<BroadcastingIndex/>} />,
                <Route key={i++} path="/broadcasting/:id" element={<BroadcastingDetail/>} />,
                <Route key={i++} path="/product" element={<ProductIndex/>} />,
                <Route key={i++} path="/product/:id" element={<ProductDetail/>} />,
                <Route key={i++} path="/category" element={<CategoryIndex/>} />,
                <Route key={i++} path="/category/:id" element={<CategoryDetail/>} />,
                <Route key={i++} path="/investment" element={<InvestmentIndex/>} />,
                <Route key={i++} path="/investment/:id" element={<InvestmentDetail/>} />,
                <Route key={i++} path="/measure" element={<MeasureIndex/>} />,
                <Route key={i++} path="/measure/:id" element={<MeasureDetail/>} />,
                <Route key={i++} path="/eventType" element={<EventTypeIndex/>} />,
                <Route key={i++} path="/eventType/:id" element={<EventTypeDetail/>} />,
                <Route key={i++} path="/warehouseType" element={<WarehouseTypeIndex/>} />,
                <Route key={i++} path="/warehouseType/:id" element={<WarehouseTypeDetail/>} />,
                <Route key={i++} path="/warehouse" element={<WarehouseIndex/>} />,
                <Route key={i++} path="/warehouse/:id" element={<WarehouseDetail/>} />,
                <Route key={i++} path="/commission" element={<CommissionIndex/>} />,
                <Route key={i++} path="/commission/:id" element={<CommissionDetail/>} />,
                <Route key={i++} path="/agenda" element={<AgendaIndex/>} />,
                <Route key={i++} path="/settings/:id" element={<SettingsDetail />}  />,
            </Route>
        </Routes>
    );
}

// function AuthRoute(props: RouteProps) {

//     const { t } = useTranslation();
//     const { actions: appActions } = useAppActions();
//     const identity = useSelector((root: RootState) => root.app.identity);
//     const { initialized, isBusy } = useSelector((root: RootState) => root.app);
    
//     useEffect(() => { 
//         const init = async () => {
//             if (identity && !initialized) {               
//                 await appActions.init(identity);
//             }
//         }   
//         init();
//     }, [identity]);
    
//     if (!identity || identity.disabled) {
//         return <Navigate replace to="/login" />
//     }

//     if (!initialized) {
//         return (
//             <Dialog 
//                 //disableBackdropClick={true} 
//                 open={isBusy}>
//                 <DialogContent>                    
//                     <p>{t('common:loadingApplication')}</p>
//                     <LinearProgress color="primary" style={{marginBottom: '1em'}} />
//                 </DialogContent>
//             </Dialog>
//         )
//     }

//     return <Route {...props} />
//     // return (
//     //     <>
//     //         <WithBaseLayout  {...props}/>
//     //     </>
//     // )
// }

// export default function WithBaseLayout(WrappedComponent: any) {

//     const { t } = useTranslation();
//     const { actions: appActions } = useAppActions();
//     const identity = useSelector((root: RootState) => root.app.identity);
//     const { initialized, isBusy } = useSelector((root: RootState) => root.app);
    
//     useEffect(() => { 
//         const init = async () => {
//             if (identity && !initialized) {               
//                 await appActions.init(identity);
//             }
//         }   
//         init();
//     }, [identity]);
    
//     if (!identity || identity.disabled) {
//         return <Navigate replace to="/login" />
//     }

//     if (!initialized) {
//         return (
//             <Dialog 
//                 //disableBackdropClick={true} 
//                 open={isBusy}>
//                 <DialogContent>                    
//                     <p>{t('common:loadingApplication')}</p>
//                     <LinearProgress color="primary" style={{marginBottom: '1em'}} />
//                 </DialogContent>
//             </Dialog>
//         )
//     }

//     return (
//         <WrappedComponent />
//     )
// }