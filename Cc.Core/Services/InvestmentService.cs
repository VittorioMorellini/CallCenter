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
    public interface IInvestmentService : IBaseService<Investment, long, CcDbContext>
    {
        IEnumerable<Investment> Search(InvestmentSearchModel model);
    }

    public class InvestmentService : BaseService<Investment, long, CcDbContext>, IInvestmentService
    {
        public InvestmentService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<Investment> Search(InvestmentSearchModel model)
        {
            return ctx.Investment;
        }
    }

    public class InvestmentSearchModel : QueryBuilderSearchModel
    {

    }
}
