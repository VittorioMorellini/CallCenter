import { BaseService } from '../../framework/core/service';
import { AppointmentReject } from '../../models';

export class AppointmentRejectService extends BaseService<AppointmentReject> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(AppointmentReject, endpoint + 'appointmentReject');
    }
}