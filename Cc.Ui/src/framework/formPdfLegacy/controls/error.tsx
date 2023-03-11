import * as React from 'react';
import { FieldContext } from '../field';
import CSS from 'csstype';

function ErrorControl<T>(props: any) {

    return (
        <FieldContext.Consumer>
            {(context: FieldContext<T>) => {

                const { offsetScale, top, left, height, width, scale, error } = context;
                const style: CSS.Properties = {
                    top: `${top }px`,
                    left: `${left}px`,
                    height: `${height}px`,
                    width: `${width}px`,
                    fontSize: `${scale + offsetScale}em`,
                    fontFamily: 'inherit',
                    position: 'absolute',
                    background: 'transparent',
                    border: '1px solid red',
                    zIndex: 1
                };

                const errorStyle: CSS.Properties = {
                    top: `${top - 30}px`,
                    left: `${left}px`,
                    // height: `${height}px`,
                    width: 'auto',
                    padding: '4px',
                    fontSize: `${Math.max(scale - 0.75, 0.5)}em`,
                    fontFamily: 'sans-serif',
                    position: 'absolute',
                    color: 'white',
                    background: 'red',
                    border: '1px solid red',
                    borderRadius: '4px',
                    zIndex: 1,
                };

                return error ? (
                    <div>
                        <div style={errorStyle}>{error}</div>
                        <div style={style} />
                    </div>
                ) : null;
            }}
        </FieldContext.Consumer>
    );
}

export default ErrorControl;