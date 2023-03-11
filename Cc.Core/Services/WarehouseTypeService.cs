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
    public interface IWarehouseTypeService : IBaseService<WarehouseType, long, CcDbContext>
    {
        IEnumerable<WarehouseType> Search(WarehouseTypeSearchModel model);
    }

    public class WarehouseTypeService : BaseService<WarehouseType, long, CcDbContext>, IWarehouseTypeService
    {
        public WarehouseTypeService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<WarehouseType> Search(WarehouseTypeSearchModel model)
        {
            return ctx.WarehouseType;
        }
    }

    public class WarehouseTypeSearchModel : QueryBuilderSearchModel
    {

    }
}
