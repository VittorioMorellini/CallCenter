using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Cc.Core.Models;
using Cc.Core.Utils;

namespace Cc.Core.Services
{
    public interface IEventTypeService : IBaseService<EventType, long, CcDbContext>
    {
        IEnumerable<EventType> Search(EventTypeSearchModel model);
    }

    public class EventTypeService : BaseService<EventType, long, CcDbContext>, IEventTypeService
    {
        public EventTypeService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<EventType> Search(EventTypeSearchModel model)
        {
            return ctx.EventType;
        }
    }

    public class EventTypeSearchModel : QueryBuilderSearchModel
    {

    }
}
