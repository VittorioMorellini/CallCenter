import { BaseService } from '../../framework/core/service';
import { EventType } from '../../models';

export class EventTypeService extends BaseService<EventType> {

    constructor(
        endpoint: string,
        protected getAccessToken: () => string,
        protected getCustomHeaders: () => Map<string, string>
    ) {
        super(EventType, endpoint + 'eventType');
    }
}