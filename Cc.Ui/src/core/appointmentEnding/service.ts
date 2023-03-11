import { BaseService } from '../../framework/core/service';
import { AppointmentEnding } from '../../models';

export class AppointmentEndingService extends BaseService<AppointmentEnding> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(AppointmentEnding, endpoint + 'appointmentEnding');
    }
}