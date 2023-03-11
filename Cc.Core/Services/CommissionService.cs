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
    public interface ICommissionService : IBaseService<Commission, long, CcDbContext>
    {
        IEnumerable<Commission> Search(CommissionSearchModel model);
    }

    public class CommissionService : BaseService<Commission, long, CcDbContext>, ICommissionService
    {
        public CommissionService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<Commission> Search(CommissionSearchModel model)
        {
            return ctx.Commission;
        }
    }

    public class CommissionSearchModel : QueryBuilderSearchModel
    {

    }
}
