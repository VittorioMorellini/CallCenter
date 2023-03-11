import { Customer, CustomerTypes, Principal } from '../../models';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLocalCustomerActions, useCustomerActions } from '.';
import { useConfiguration, useTopCountryMode } from '../../app/core/hooks';


export function useCustomerLogic() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { actions: customerActions, logger } = useLocalCustomerActions();
    const { actions: globlaCustomerActions } = useCustomerActions();
    const conf = useConfiguration();
    const { ITALY_CODE } = useTopCountryMode();

    const newCustomer = () => {

        let item = new Customer();
        item.type = CustomerTypes.CORPORATE.toString();
        item.country = conf.customerDefaultCountry ?? ITALY_CODE;
        // if (item.country !== ITALY_CODE)
        //     item.province = 'EE'
        item.identificationDocCountry =  conf.customerDefaultCountry ?? ITALY_CODE;

        return item;
    }

    const personalData = async (identity: Principal, companyId?: number, agencyId?: number, certificate?: boolean) => {

        try
        {
            if (!companyId) {
                logger.error(t('common:companyMissing'));
                return;
            }

            let customers: Customer[] = await customerActions.findBySalesmanId(companyId, identity.id);
            if (customers && customers.length >= 1) {
                globlaCustomerActions.itemSelected(customers[0], 0);
                navigate('/personal/' + customers[0].id);
            } else if (!customers || customers.length === 0) {
                let item = newCustomer();
                item.companyId = companyId;
                if (agencyId)
                    item.agencyId = agencyId;
                item.firstName = identity.surname;
                item.lastName = identity.name;
                item.taxCode = identity.taxCode;
                item.mail = identity.mail;
                item.phone = identity.phone;
                item.type = CustomerTypes.PERSON.toString();
                item.salesmanId = identity.id;
                globlaCustomerActions.itemSelected(item, 0);
                navigate('/personal/' + 0);
            }
        }
        catch(error)
        {
            // dispatch(failure(error));
            return Promise.reject(error);
        }
    }

    return {
        newCustomer,
        personalData
    }
}