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
    public interface IWarehouseService : IBaseService<Warehouse, long, CcDbContext>
    {
        IEnumerable<Warehouse> Search(WarehouseSearchModel model);
    }

    public class WarehouseService : BaseService<Warehouse, long, CcDbContext>, IWarehouseService
    {
        public WarehouseService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<Warehouse> Search(WarehouseSearchModel model)
        {
            return ctx.Warehouse;
        }
    }

    public class WarehouseSearchModel : QueryBuilderSearchModel
    {

    }
}
