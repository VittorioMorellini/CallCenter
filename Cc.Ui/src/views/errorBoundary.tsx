import * as React from 'react';
import { connect } from 'react-redux';
import { i18n } from '../framework/i18n';
// import { Storage } from '../business/auth/actions';
import BaseDialog from '../framework/ui/feedback/dialog';
import { RootState } from '../app/reducers';
import { LogError } from '../models/logError';
import { useNavigate } from 'react-router';
//import { withNavig } from 'react-router';

interface ErrorState {
    hasError: boolean;
    error?: any;
}

class ErrorBoundary extends React.Component<any, ErrorState> {

    constructor(props: any) {
        super(props);
        this.state = { 
            hasError: false
        };
    }
    
    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        // alert('Error getDerived: ' + error.message);
        return { 
            hasError: true,
            error
        };
    }
    
    componentDidCatch(error: any, info: any) {
        // Storage.clear('oidc');
        // alert('Error didCatch: ' + this.state.error.message);
        let item = LogError.newItem();
        item.version = process.env.REACT_APP_VERSION;
        item.error = error.message;
        item.stack = error.stack;
        //Log to DB        
        //this.props.logErrorService.error(item);        
    }
    
    render() {
        if (this.state.hasError) console.log('render error')
        if (this.state.hasError) {            
            return (
                <BaseDialog
                    open={this.state.hasError}
                    title={i18n.t('common:error')}
                    message={this.state.error.message}
                    severity={3} /* error */  
                    handleConfirm={() => { 
                        this.props.navigate('/' + this.props.currentRoute); 
                        this.setState({hasError: false})
                    }}
                />
            );
        }
        return this.props.children;
    }
}

function withNavigation(Component: any) {
    return (props: any) => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(
    connect(
        (state: RootState) => { return { 
            //logErrorService: state.service.logError,
            currentRoute: state.app.currentRoute 
        }},
        (dispatch: any) => { return  { dispatch } }
    )
(ErrorBoundary));

