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
    public interface IAppointmentEndingService : IBaseService<AppointmentEnding, long, CcDbContext>
    {
        IEnumerable<AppointmentEnding> Search(AppointmentEndingSearchModel model);
    }

    public class AppointmentEndingService : BaseService<AppointmentEnding, long, CcDbContext>, IAppointmentEndingService
    {
        public AppointmentEndingService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<AppointmentEnding> Search(AppointmentEndingSearchModel model)
        {
            return ctx.AppointmentEnding;
        }
    }

    public class AppointmentEndingSearchModel : QueryBuilderSearchModel
    {

    }
}
