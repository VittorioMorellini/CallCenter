import React from 'react';
import { Panel } from '../../framework/ui';
import { Field } from '../../framework/ui/form';
import { Company } from '../../models';

export default () => (
    <>
        <Panel>
            <Field.Input model={(x: Company) => x.businessName}  />
            <Field.Input model={(x: Company) => x.vatCode}  />
            <Field.Input
                model={(x: Company) => x.mail}
                helper="Questo campo verrà utilizzato per le eventuali comunicazioni di completamento dossier, è possibile specificare più indirizzi separatati da ; (punto e virgola)."
            />
            {/* <Field.Input model={(x: Company) => x.pdfPassword} 
                ControlProps={{type: 'password'}}
            /> */}
        </Panel>
    </>
)