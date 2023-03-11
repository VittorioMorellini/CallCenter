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
    public interface IAppointmentRejectService : IBaseService<AppointmentReject, long, CcDbContext>
    {
        IEnumerable<AppointmentReject> Search(AppointmentRejectSearchModel model);
    }

    public class AppointmentRejectService : BaseService<AppointmentReject, long, CcDbContext>, IAppointmentRejectService
    {
        public AppointmentRejectService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<AppointmentReject> Search(AppointmentRejectSearchModel model)
        {
            return ctx.AppointmentReject;
        }
    }

    public class AppointmentRejectSearchModel : QueryBuilderSearchModel
    {

    }
}
