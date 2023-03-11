import React from 'react';
import { useHomeViews, ValueLabel } from '../../core';
import { Panel } from '../../framework/ui';
import { autocompleteOptions, Field } from '../../framework/ui/form';
import { Company, Configuration, PersonDetailModes, TabCountry } from '../../models';

type Props = {
    companies: Company[];
    languages: ValueLabel[];
    countries: TabCountry[];
}

export default ({ companies, languages, countries }: Props) => {

    const retentionPolicies = [{ value: 0, label: 'None' },{ value: 1, label: 'Archive' }, { value: 2, label: 'Remote archive' }, { value: 3, label: 'Delete' }];
    const legalArchivingModes = [{ value: 'LEGACY', label: 'Legacy' }, { value: 'AGID', label: 'Agid' }];
    const personDetailModes = [{ value: PersonDetailModes.STANDARD, label: 'Standard' }, { value:  PersonDetailModes.EXTENDED, label: 'Extended' }];
    const homeViews = useHomeViews();
    
    return (
        <>
            <input type="text" name="fakeUsername" id="username" value="" style={{position: 'absolute', top: -5000, left: -5000}} />
            <input type="password" name="fakePassword" id="password" value="" style={{position: 'absolute', top: -5000, left: -5000}} />

            <Panel title="Generale">
                <Field.Autocomplete
                    model={(x: Configuration) => x.companyId}
                    options={autocompleteOptions(companies, x => x.id, x => x.businessName)}
                    blank={{ value: '', label: 'Global' }}
                />
                <Field.Autocomplete
                    model={(x: Configuration) => x.retentionPolicy}
                    options={autocompleteOptions(retentionPolicies, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
                <Field.Input model={(x: Configuration) => x.retentionPeriod} />
                <Field.Input model={(x: Configuration) => x.retentionPeriodArchive} />
                <Field.Input model={(x: Configuration) => x.principalMaxCount} />
                <Field.Autocomplete
                    model={(x: Configuration) => x.customerDefaultCountry}
                    options={autocompleteOptions(countries, x => x.code, x => x.name)}
                    blank={{ value: '', label: 'Global' }}
                />
                <Field.Input model={(x: Configuration) => x.customerDefaultPhonePrefix} />
                <Field.Autocomplete
                    model={(x: Configuration) => x.legalArchivingMode}
                    options={autocompleteOptions(legalArchivingModes, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
                <Field.Autocomplete
                    model={(x: Configuration) => x.uiCustomerDetail}
                    options={autocompleteOptions(personDetailModes, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
            </Panel>
            <Panel title="UI" mode="accordion">
                <Field.Input model={(x: Configuration) => x.uiLogoUrl} />
                <Field.Color model={(x: Configuration) => x.uiLogoBackground} />
                <Field.Autocomplete
                    model={(x: Configuration) => x.uiLanguage}
                    options={autocompleteOptions(languages, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
                <Field.Autocomplete
                    model={(x: Configuration) => x.uiHome}
                    options={autocompleteOptions(homeViews, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
            </Panel>
            <Panel title="Colors" mode="accordion">
                <Field.Color model={(x: Configuration) => x.uiColorPrimaryLight} />
                <Field.Color model={(x: Configuration) => x.uiColorPrimaryMain}  />
                <Field.Color model={(x: Configuration) => x.uiColorPrimaryDark}  />
                <Field.Color model={(x: Configuration) => x.uiColorPrimaryContrastText}  />
                <Field.Color model={(x: Configuration) => x.uiColorSecondaryLight}  />
                <Field.Color model={(x: Configuration) => x.uiColorSecondaryMain}  />
                <Field.Color model={(x: Configuration) => x.uiColorSecondaryDark}  />
                <Field.Color model={(x: Configuration) => x.uiColorSecondaryContrastText}  />
            </Panel>
            <Panel title="LegalBus" mode="accordion">           
                <Field.Input model={(x: Configuration) => x.legalBusUrl} />
                <Field.Input model={(x: Configuration) => x.legalBusCompany} />
                <Field.Input model={(x: Configuration) => x.legalBusUsername} />
                <Field.Input model={(x: Configuration) => x.legalBusPassword}
                    ControlProps={{ type: 'password' }}
                />
            </Panel>
            <Panel title="LegalBus - Staging" mode="accordion">
                <Field.Input model={(x: Configuration) => x.legalBusStagingUrl} />
                <Field.Input model={(x: Configuration) => x.legalBusStagingCompany} />
                <Field.Input model={(x: Configuration) => x.legalBusStagingUsername} />
                <Field.Input model={(x: Configuration) => x.legalBusStagingPassword}
                    ControlProps={{ type: 'password' }}
                />
            </Panel>
            <Panel title="TOP" mode="accordion">
                <Field.Input model={(x: Configuration) => x.topUrl} />
                <Field.Input model={(x: Configuration) => x.topCompany} />
                <Field.Input model={(x: Configuration) => x.topUsername} />
                <Field.Input model={(x: Configuration) => x.topPassword}
                    ControlProps={{ type: 'password' }}
                />
            </Panel>
            <Panel title="TOP - Staging" mode="accordion">
                <Field.Input model={(x: Configuration) => x.topStagingUrl} />
                <Field.Input model={(x: Configuration) => x.topStagingCompany} />
                <Field.Input model={(x: Configuration) => x.topStagingUsername} />
                <Field.Input model={(x: Configuration) => x.topStagingPassword}
                    ControlProps={{ type: 'password' }}
                />
            </Panel>
            <Panel title="FTP" mode="accordion">
                <Field.Input model={(x: Configuration) => x.ftpServer} />
                <Field.Input model={(x: Configuration) => x.ftpPort} />
                <Field.Input model={(x: Configuration) => x.ftpOutputDir} />
                <Field.Input model={(x: Configuration) => x.ftpInputDir} />
                <Field.Input model={(x: Configuration) => x.ftpWorkingDir} />
                <Field.Input model={(x: Configuration) => x.ftpDoneDir} />
                <Field.Input model={(x: Configuration) => x.ftpUsername} />
                <Field.Input model={(x: Configuration) => x.ftpPassword}
                    ControlProps={{ type: 'password' }}
                />
            </Panel>
            {/* <Panel title="Workflow - Upload documents" mode="accordion">
                <Field.Autocomplete
                    model={(x: Configuration) => x.wfUploadDocumentsAutoSelectDocumentType}
                    options={autocompleteOptions(options, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
                <Field.Input model={(x: Configuration) => x.wfUploadDocumentsBestMatchDocumentTypeThreshold} />
                <Field.Autocomplete
                    model={(x: Configuration) => x.wfUploadDocumentsValidateReasons}
                    options={autocompleteOptions(options, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
                <Field.Autocomplete
                    model={(x: Configuration) => x.wfUploadDocumentsAutoSelectTemplate}
                    options={autocompleteOptions(options, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
            </Panel>
            <Panel title="Workflow - Engage TOP" mode="accordion">
                <Field.Autocomplete
                    model={(x: Configuration) => x.wfEngageTopUpdateSigner}
                    options={autocompleteOptions(updateSignerOptions, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
                <Field.Input model={(x: Configuration) => x.wfEngageTopMsPolling} />
            </Panel>
            <Panel title="Workflow - Dossier completed" mode="accordion">
                <Field.Autocomplete
                    model={(x: Configuration) => x.wfDossierCompletedNotifyCreator}
                    options={autocompleteOptions(notifyCreatorOptions, x => x.value, x => x.label)}
                    blank={{ value: '', label: 'Global' }}
                />
            </Panel> */}
        </>
    )
}