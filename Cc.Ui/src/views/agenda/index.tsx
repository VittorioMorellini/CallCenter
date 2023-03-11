import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UNSAFE_NavigationContext, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IndexView, Panel } from '../../framework/ui';
import { useLocalPrincipalActions, usePrincipalActions } from '../../core/principal';
import { Principal, PrincipalSearchModel, Roles} from '../../models';
import { RootState } from '../../app/reducers';
//import Search from './search';
import Table from './table';
import { useIdentity } from '../../app/core/hooks';
import { BrowserHistory } from "history";
import SchedulerCalendar from './scheduler';

export default (props: any) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions } = usePrincipalActions();
    const isBusy = useSelector((root: RootState) => root.principal.isBusy);
    const model = useSelector((root: RootState) => root.principal.searchModel);
    //const salesman = useSelector((root: RootState) => root.principal.currentItem);
    const { companyId } = useIdentity();
    const navigation = useContext(UNSAFE_NavigationContext).navigator as BrowserHistory;
    const [salesman, setSalesman] = useState<Principal>(null)
    //const [salesmans, setSalesmans] = useState<Principal[]>([])
    
    useEffect(() => {
        //console.log('use effect history action', navigation.action)
        console.log('companyId salesman', companyId)
        if (navigation.action !== 'POP') {
            model.role = Roles.SALESMAN;
            if (companyId && companyId != 0) model.companyId = companyId;
            actions.search(model).catch(() => { });
        }
        //CleanUp function
        return () => {
            model.role = null;
            model.companyId = null;  
        }
    }, [model]);

    const handler = {
        // add: () => {
        //     let item = Principal.newItem();
        //     item.companyId = companyId;
        //     handler.itemClick(item, 0);
        // },
        itemClick: (item: Principal, index: number) => {
            actions.itemSelected(item, index);
            //Load agenda of the salesman
            console.log('selected salesman', item)
            setSalesman(item);
            //navigate('/agenda/' + item.id);
        },
    }

    return (
        <div style={{overflowY: 'scroll', height: '100%'}}>
            <h2 style={{paddingLeft: '20px'}}>{t('views:agenda.index.title')}</h2> 
            <Table onItemClick={handler.itemClick} />
            {salesman &&
                <SchedulerCalendar salesman={salesman}/>
            }
        </div>
    );
}