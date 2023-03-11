import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UNSAFE_NavigationContext, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IndexView, Panel } from '../../framework/ui';
import { usePrincipalActions } from '../../core/principal';
import { Principal} from '../../models';
import { RootState } from '../../app/reducers';
import Search from './search';
import Table from './table';
import { useIdentity } from '../../app/core/hooks';
import { BrowserHistory } from "history";

export default (props: any) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { actions, logger } = usePrincipalActions();
    const isBusy = useSelector((root: RootState) => root.principal.isBusy);
    const model = useSelector((root: RootState) => root.principal.searchModel);
    const { companyId } = useIdentity();
    const navigation = useContext(UNSAFE_NavigationContext).navigator as BrowserHistory;

    const promises = [
        Promise.resolve(100),
        Promise.resolve(200),
        Promise.reject("Oops")
    ];

    useEffect(() => {
        console.log('Promise useeffect')
        //this works anyway, while waitall fails if anyone of the promise reject
        Promise.allSettled(promises).then(result => {
            console.log('result', result);
        })
    }, [])
    
    useEffect(() => {
        console.log('use effect history action', navigation.action)
        if (navigation.action !== 'POP') {
            actions.search(model).catch(() => { });
        }
    }, [model]);

    // const uniqueArray = () => {
    //     const arr: number[] = [1,3,2,3,2,1,2,3,5,4,6,7,7,7,6,5,3]
    //     const unique: number[] = [...new Set(arr)]
    // }

    const handler = {
        add: () => {
            let item = Principal.newItem();
            item.companyId = companyId;
            handler.itemClick(item, 0);
        },
        itemClick: (item: Principal, index: number) => {
            actions.itemSelected(item, index);
            navigate('/principal/' + item.id);
        },
    }

    const content = (
        <Panel title={t('common:results')}>
            <Table onItemClick={handler.itemClick} />
        </Panel>
    );

    return (
        <>
            <IndexView 
                title={t('views:principal.index.title')}
                isBusy={isBusy}
                content={content} 
                search={<Search />}
                onAdd={handler.add}
                //actions={<Button.Add onClick={handler.upload} text="Upload" buttonVariant="outlined" />}
            />
        </>
    );
}