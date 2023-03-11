import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useIdentity } from '../app/core/hooks';
import { RootState } from '../app/reducers';
import { BroadcastingTypes, Roles } from '../models';

export type ValueLabel = {
    value: any,
    label: string;
}

export function useDossierFieldTypes() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: 'INPUT', label: t('types:dossierField.input') }, 
        { value: 'DATE', label: t('types:dossierField.date') }, 
        { value: 'SWITCH', label: t('types:dossierField.switch') }, 
        // { value: 'AUTOCOMPLETE', label: t('types:dossierField.autocomplete') }, 
    ] as ValueLabel[]
    , [])
}

export function useDossierFieldValueTypes() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: 'T', label: t('types:dossierFieldValue.text') }, 
        { value: 'Q', label: t('types:dossierFieldValue.query') }, 
        { value: 'J', label: t('types:dossierFieldValue.json') }, 
    ] as ValueLabel[]
    , [])
}

export function useRoleFullTypes() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: Roles.ADMIN, label: t('types:role.admin') }, 
        { value: Roles.MANAGER, label: t('types:role.manager') }, 
        { value: Roles.SALESMAN, label: t('types:role.salesman') }, 
        { value: Roles.OPERATOR, label: t('types:role.operator') },
        { value: Roles.CUSTOMER, label: t('types:role.customer') },
        { value: Roles.LAWYER, label: t('types:role.lawyer') },
    ] as ValueLabel[]
    , [])
}

export function useRoleTypes() {

    const { t } = useTranslation();
    return useMemo(() => [
        //{ value: Roles.ADMIN, label: t('types:role.admin') }, 
        { value: Roles.MANAGER, label: t('types:role.manager') }, 
        { value: Roles.SALESMAN, label: t('types:role.salesman') }, 
        { value: Roles.OPERATOR, label: t('types:role.operator') },
        { value: Roles.CUSTOMER, label: t('types:role.customer') },
        { value: Roles.LAWYER, label: t('types:role.lawyer') },
    ] as ValueLabel[]
    , [])
}

export function useTrustLevels() {

    const { t } = useTranslation();
    return useMemo(() => [
        // { value: '0', label: t('types:trustLevel.notDefined') }, 
        // { value: '1', label: t('types:trustLevel.fes') },
        { value: '2', label: t('types:trustLevel.fea') },
        { value: '3', label: t('types:trustLevel.feq') },
    ] as ValueLabel[]
    , [])
}

export function useSexType() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: 'M', label: t('types:sex.male') },
        { value: 'F', label: t('types:sex.female') },
    ] as ValueLabel[]
    , [])
}

export function useIdentityDocument() {
    
    const { t } = useTranslation();
    return useMemo(() => [ // AL|CI|PA|PD|PN|PS|PT
        { value: 'CI', label: t('types:identityDocument.identityCard') },
        { value: 'PT', label: t('types:identityDocument.drivingLicense') },
        { value: 'PS', label: t('types:identityDocument.passport') }
    ] as ValueLabel[]
    , [])
}

export function useBroadcastingTypes() {
    
    const { t } = useTranslation();
    return useMemo(() => [ // AL|CI|PA|PD|PN|PS|PT
        { value: BroadcastingTypes.TvNazionale, label: t('types:broadcastingTypes.nationalTv') },
        { value: BroadcastingTypes.TvLocale, label: t('types:broadcastingTypes.localTv') },
        { value: BroadcastingTypes.Telemarketing, label: t('types:broadcastingTypes.telemarketing') },
        { value: BroadcastingTypes.Giornale, label: t('types:broadcastingTypes.paper') },
        { value: BroadcastingTypes.WEB, label: t('types:broadcastingTypes.web') }
    ] as ValueLabel[]
    , [])
}

export function useTypeStatus() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: 'Q', label: t('types:status.queued') },
        { value: 'R', label: t('types:status.running') },
        { value: 'E', label: t('types:status.error') },
        { value: 'C', label: t('types:status.completed') },
    ] as ValueLabel[]
    , [])
}

export function useSignerNumbers() {

    const signerNumbers: number[] = [];
    for (let i = 1; i <= 20; i++) {
        signerNumbers.push(i);
    }

    return useMemo(() => {
        let list: ValueLabel[] = (signerNumbers.map(x => ({ value: x, label: x.toString() })));
        return list;
    }, [])
}


export function usePageNumbers(count: number) {

    const { t } = useTranslation();
    const pageNumbers: number[] = [];
    for (let i = 1; i <= count; i++) {
        pageNumbers.push(i);
    }

    return useMemo(() => {
        let list: ValueLabel[] = (pageNumbers.map(x => ({ value: x, label: x.toString() })));
        list.splice(0, 0, { value: -1, label: t('common:lastPage')});
        return list;
    }, [count])
}

export function useEnvironments() {

    return useMemo(() => [
        { value: 'PRODUCTION', label: 'Production' },
        { value: 'STAGING', label: 'Staging' },
    ] as ValueLabel[]
    , [])
}

export function useFlowTypes() {

    return useMemo(() => [
        { value: '0', label: 'Standard' },
        { value: '1', label: 'Without documents' },
    ] as ValueLabel[]
    , [])
}

export function useLookups(companyId?: number) {
    const ident = useIdentity();
    companyId = companyId ?? ident.companyId;
    const lookup = useSelector((root: RootState) => root.lookup);

    return useMemo(() => ({
        company: lookup.companies.find(x => x.id === companyId),
        companies: lookup.companies,
        agencies: lookup.agencies.filter(x => x.companyId === companyId),
        products: lookup.products.filter(x => companyId === null || x.companyId === companyId),
        districts: lookup.districts,        
        regions: lookup.regions,
        categories: lookup.categories
    }), [companyId, lookup]);
}

export function useLanguages() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: 'it', label: t('types:language.it') },
        { value: 'en', label: t('types:language.en') },
    ] as ValueLabel[]
    , [])
}

export function useCustomerTypes() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: 0, label: t('types:customer.corporate') },
        { value: 1, label: t('types:customer.person') },
    ] as ValueLabel[]
    , [])
}

export function useHomeViews() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: 'DOSSIER', label: 'Dossier' },
        { value: 'DASHBOARD', label: 'Dashboard' },
    ] as ValueLabel[]
    , [])
}

export function useAdditionalReasons() {

    const { t } = useTranslation();
    return useMemo(() => [
        { value: 0, label: t('types:additionalReasons.0') },
        { value: 1, label: t('types:additionalReasons.1') },
        { value: 2, label: t('types:additionalReasons.2') },
    ] as ValueLabel[]
    , [])
}

export function useInvestmentTypes() {
    return useMemo(() => [
        { value: 'FIXED', label: 'Fixed' },
        { value: 'ROYALTY', label: 'Royalty' },
    ] as ValueLabel[]
    , [])
}

export function useLegalDocumentTypeAttributeModel() {

    return useMemo(() => [
        { value: 'VALUE', label: 'Valore fisso' },
        // { value: 'LEGAL_DOCUMENT_TYPE', label: 'Classe documentale' },
        // { value: 'DOCUMENT_DATE', label: 'Data documento' },
        { value: 'DOSSIER_ID', label: 'Dossier id' },
        { value: 'DOSSIER_NAME', label: 'Nome dossier' },
        { value: 'DOSSIER_PAYLOAD', label: 'Dossier payload' },
        { value: 'DOSSIER_INSERTUSER', label: 'Utente dossier' },
        { value: 'DOSSIER_YEAR', label: 'Anno dossier' },
        { value: 'DOSSIER_MONTH', label: 'Mese dossier' },
        { value: 'DOCUMENT_NAME', label: 'Nome documento' },
        { value: 'DOCUMENT_TYPE_DESCRIPTION', label: 'Descrizione tipo documento' },
        { value: 'SIGNER_TAXCODE', label: 'Codice fiscale firmatario' },
        { value: 'SIGNER_NAME', label: 'Nome firmatario' },
        { value: 'SIGNER_SURNAME', label: 'Cognome firmatario' },
        { value: 'PRODUCT_DESCRIPTION', label: 'Descrizione prodotto' },
        { value: 'SIGNER_RESIDENCECOUNTRY', label: 'Paese residenza' },
    ] as ValueLabel[]
    , [])
}

export function useDocumentTypeTopCompositionAttributeModel() {

    return useMemo(() => [
        { value: 'VALUE', label: 'Valore fisso' },
        { value: 'AGENCY_NAME', label: 'Nome agenzia' },
        { value: 'AGENCY_VATCODE', label: 'Partita Iva agenzia' },
        { value: 'AGENCY_CITY', label: 'Città agenzia' },
        { value: 'AGENCY_ADDRESS', label: 'Indirizzo agenzia' },
    ] as ValueLabel[]
    , [])
}

export function useDocumentTypeTopCompositionType() {

    return useMemo(() => [
        { value: 'D', label: 'Documento' },
        { value: 'S', label: 'Firmatario' },
    ] as ValueLabel[]
    , [])
}

export function useTaskVisibility() {

    return useMemo(() => [
        { value: '0', label: 'Hidden' },
        { value: '1', label: 'Visible' },
        { value: '2', label: 'Conditional' },
    ] as ValueLabel[]
    , [])
}

export function useIdentificationTypes() {

    return useMemo(() => [
        { value: 'NONE', label: 'NONE' },
        { value: 'AML', label: 'AML' },
        { value: 'LIVE', label: 'LIVE' },
        { value: 'SELF', label: 'SELF' },
        { value: 'SPID', label: 'SPID' },
        { value: 'VIDEO', label: 'VIDEO' },
    ] as ValueLabel[]
    , [])
}

export function useSignatureTypes() {

    return useMemo(() => [
        { value: 'NONE', label: 'NONE' },
        { value: 'FEA_OS', label: 'FEA_OS' },
        { value: 'FEQ_OS', label: 'FEQ_OS' },
        { value: 'FEQ_LT', label: 'FEQ_LT' },
    ] as ValueLabel[]
    , [])
}

export function useAutomaticUploadTypes() {
    return useMemo(() => [
        { value: 0, label: 'None' },
        { value: 1, label: 'Frontend' },
        { value: 2, label: 'Backend' },
    ] as ValueLabel[]
    , [])
}

export function useCustomerLegalidTypes() {

    return useMemo(() => [
        { value: 0, label: 'Forza riconoscimento italiano (codice fiscale)' },
        { value: 1, label: 'Forza riconoscimento estero (numero documento d\'identità)' },
        { value: 2, label: 'In base alla cittadinanza' },
    ] as ValueLabel[]
    , [])
}

export function useSignerIdentityAssertionTypes() {

    return useMemo(() => [
        { value: 'F', label: 'Full' },
        { value: 'L', label: 'Lite (processo SPID)' },
    ] as ValueLabel[]
    , [])
}

export function useSelfProcessPresetsTypes() {
    return useMemo(() => [
        { value: 'PRESET_ECONTRACT_SELFID', label: 'PRESET_ECONTRACT_SELFID' },
        { value: 'PRESET_MIP_SELFID', label: 'PRESET_MIP_SELFID' },
    ] as ValueLabel[]
    , [])
}

export function getLabel(list: ValueLabel[], valueToCompare: any) {
    return list.find(x => x.value === valueToCompare)?.label;
}