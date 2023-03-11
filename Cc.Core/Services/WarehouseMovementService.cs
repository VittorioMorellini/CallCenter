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
    public interface IWarehouseMovementService : IBaseService<WarehouseMovement, long, CcDbContext>
    {
        IEnumerable<WarehouseMovement> Search(WarehouseMovementSearchModel model);
    }

    public class WarehouseMovementService : BaseService<WarehouseMovement, long, CcDbContext>, IWarehouseMovementService
    {
        public WarehouseMovementService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<WarehouseMovement> Search(WarehouseMovementSearchModel model)
        {
            return ctx.WarehouseMovement;
        }
    }

    public class WarehouseMovementSearchModel : QueryBuilderSearchModel
    {

    }
}
