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
    public interface IOrderRowService : IBaseService<OrderRow, long, CcDbContext>
    {
        IEnumerable<OrderRow> Search(OrderRowSearchModel model);
    }

    public class OrderRowService : BaseService<OrderRow, long, CcDbContext>, IOrderRowService
    {
        public OrderRowService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<OrderRow> Search(OrderRowSearchModel model)
        {
            return ctx.OrderRow;
        }
    }

    public class OrderRowSearchModel : QueryBuilderSearchModel
    {

    }
}
