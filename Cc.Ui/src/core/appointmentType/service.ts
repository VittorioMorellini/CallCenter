import { BaseService } from '../../framework/core/service';
import { AppointmentType } from '../../models';

export class AppointmentTypeService extends BaseService<AppointmentType> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(AppointmentType, endpoint + 'appointmentType');
    }
}