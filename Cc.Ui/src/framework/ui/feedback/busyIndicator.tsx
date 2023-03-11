import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export default function (props: any) {
    return props.isBusy ? <LinearProgress color="primary" sx={{flex: '0 0 auto', marginLeft: '1rem', marginRight: '1rem'}} /> : null;
}