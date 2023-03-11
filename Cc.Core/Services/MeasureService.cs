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
    public interface IMeasureService : IBaseService<Measure, long, CcDbContext>
    {
        IEnumerable<Measure> Search(MeasureSearchModel model);
    }

    public class MeasureService : BaseService<Measure, long, CcDbContext>, IMeasureService
    {
        public MeasureService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<Measure> Search(MeasureSearchModel model)
        {
            return ctx.Measure;
        }
    }

    public class MeasureSearchModel : QueryBuilderSearchModel
    {

    }
}
