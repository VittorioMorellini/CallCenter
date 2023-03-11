import React from 'react';
import { Logger, LoggerServiceContext, LoggerServiceOptions } from './types';

const useLogger = (props: LoggerServiceOptions) => {
    let logger = React.useContext(LoggerServiceContext)(props);
    if (logger === undefined) // || logger.error === undefined)
        throw new Error(`Incorrect use of ${props.key} useLogger outside LoggerServiceProvider`)

    return logger;
}

export default useLogger;