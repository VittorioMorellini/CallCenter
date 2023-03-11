import { BaseService } from '../../framework/core/service';
import { Appointment } from '../../models';

export class AppointmentService extends BaseService<Appointment> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(Appointment, endpoint + 'appointment');
    }
}