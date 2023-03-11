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
    public interface IAppointmentService : IBaseService<Appointment, long, CcDbContext>
    {
        IEnumerable<Appointment> Search(AppointmentSearchModel model);
    }

    public class AppointmentService : BaseService<Appointment, long, CcDbContext>, IAppointmentService
    {
        public AppointmentService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<Appointment> Search(AppointmentSearchModel model)
        {
            var query = ctx.Appointment.AsQueryable();

            if (model.SalesmanId != null)
                query = query.Where(x => x.SalesmanId == model.SalesmanId.GetValueOrDefault());

            return query.ToList();
        }
    }

    public class AppointmentSearchModel : QueryBuilderSearchModel
    {
        public long? SalesmanId { get; set; }
    }
}
