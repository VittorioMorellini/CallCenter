import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { usePrincipalActions } from '../../core/principal';
import { useProductActions } from '../../core/product';
import { TopCountryMode } from '../../models';
import { RootState } from '../reducers';
import { NavSection } from '../views/nav';

export function useIdentity() {

    const identity = useSelector((root: RootState) => root.app.identity);

    const currentCompanyId = useSelector((root: RootState) => root.app.currentCompanyId);
    const currentAgencyId = useSelector((root: RootState) => root.app.currentAgencyId);
    console.log('useIdentity', identity)
    return useMemo(() => {

        let companyId = identity?.companyId || currentCompanyId!;
        //const companyFlows = flows.filter(x => x.companyId === companyId);

        return {
            identity: identity!,
            companyId,
            agencyId: currentAgencyId,
            role: identity?.role,
            isAdmin: identity?.role === 'ADMIN',
            //isAdmin: identity?.role === 'ADMIN',
            isManager: identity?.role === 'MANAGER',
            isSalesman: identity?.role === 'SALESMAN',
            isOperator: identity?.role === 'OPERATOR',
            isCustomer: identity?.role === 'CUSTOMER',
            initials: `${identity?.name && identity.name.length > 0 ? identity.name[0] : ' '}${identity?.surname && identity.surname.length > 0 ? identity.surname[0] : ' '}`
        };
    }, [identity, currentCompanyId, currentAgencyId]);
}


export function useConfiguration() {

    const { configurations } = useSelector((root: RootState) => root.lookup);
    const { companyId } = useIdentity();
    console.log('useIdentity useConfiguration get company', companyId)
    console.log('useIdentity useConfiguration get configurations', configurations)
    return useMemo(() => {

        let configuration = configurations.find(x => x.companyId === companyId);
        configuration = configuration ?? configurations.find(x => !x.companyId)!;
        console.log('useIdentity configurations', configuration)

        return {
            ...configuration,
            uiLogoUrl: `${process.env.REACT_APP_BASE_URL}/images/${configuration?.uiLogoUrl ?? 'logo_LAYOUT.png'}`,
            uiLogoBackground: configuration?.uiLogoBackground ?? '#fff',
            uiHome: configuration?.uiHome ?? 'ORDER',
        }
    }, [companyId]);
}

export function useTopCountryMode() {

    let conf = useConfiguration();

    return useMemo(() => ({
        isIso2: conf.topCountryMode === TopCountryMode.ISO2,
        ITALY_CODE: conf.topCountryMode === TopCountryMode.ISO2 ? 'IT' : 'I'
    }), [conf]);
}

export function useColor() {

    const { companyId } = useIdentity();

    return useMemo(() => {
        return {
            primary: {
                light: '#5ba7d0',
                main: '#2c92ed',
                dark: '#256bef',
                contrastText: '#fff',
            },
            secondary: {
                light:  '#3d577b',
                main:  '#0b2e4f',
                dark:  '#000327',
                contrastText:  '#fff',
            }
        }
    }, [companyId]);
}

export function useEnhanceModel() {
    const { companyId, agencyId } = useIdentity();
    const enhanceModel = (model: any) => (state: RootState) => {

        model.companyId = companyId;
        model.agencyId = agencyId;
        return model;
    }
    return enhanceModel;
}

export function useShowCompany() {
    const { isAdmin } = useIdentity();
    const companyId = useSelector((state: RootState) => state.app.currentCompanyId)
    return isAdmin && !companyId;
}

export function useNavSections() {

    const { t } = useTranslation();
    const { isAdmin, isManager } = useIdentity();
    //const conf = useConfiguration();

    const navSections: NavSection[] = [];

    navSections.push({
        title: t('views:nav.operation'),
        routes: ['customer', 'agenda', 'order', 'checklist']
    })

    navSections.push({
        title: t('views:nav.report'),
        routes: ['statistics.salesman', 'statistics.callcenter']
    })
    
    if (isManager || isAdmin) {
        navSections.push({  
            title: t('views:nav.configuration'),
            routes: ['product', 'principal', 'agency']
        })
    }

    if (isAdmin) {
        navSections.push({
            title: t('views:nav.configuration'),
            routes: ['company', 'agency', 'principal', 'product', 'category', 'broadcasting', 'investment', 'warehouse', 'eventType', 'measure', 'warehouseType', 'commission', 'configuration']
        });
        navSections.push({
            title: t('views:nav.log'),
            routes: ['logError', 'logChange']
        });
    }

    return navSections;
}