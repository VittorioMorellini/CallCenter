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
    public interface IAppointmentTypeService : IBaseService<AppointmentType, long, CcDbContext>
    {
        IEnumerable<AppointmentType> Search(AppointmentTypeSearchModel model);
    }

    public class AppointmentTypeService : BaseService<AppointmentType, long, CcDbContext>, IAppointmentTypeService
    {
        public AppointmentTypeService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<AppointmentType> Search(AppointmentTypeSearchModel model)
        {
            return ctx.AppointmentType;
        }
    }

    public class AppointmentTypeSearchModel : QueryBuilderSearchModel
    {

    }
}
