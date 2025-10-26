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
    public interface IOrderTableService : IBaseService<OrderTable, long, CcDbContext>
    {
        IEnumerable<OrderTable> Search(OrderTableSearchModel model);
    }

    public class OrderTableService : BaseService<OrderTable, long, CcDbContext>, IOrderTableService
    {
        public OrderTableService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<OrderTable> Search(OrderTableSearchModel model)
        {
            return ctx.OrderTable;
        }
    }

    public class OrderTableSearchModel : QueryBuilderSearchModel
    {

    }
}
