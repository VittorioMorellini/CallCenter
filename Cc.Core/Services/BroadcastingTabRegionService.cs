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
    public interface IBroadcastingTabRegionService : IBaseService<BroadcastingTabRegion, long, CcDbContext>
    {
        IEnumerable<BroadcastingTabRegion> Search(BroadcastingTabRegionSearchModel model);
    }

    public class BroadcastingTabRegionService : BaseService<BroadcastingTabRegion, long, CcDbContext>, IBroadcastingTabRegionService
    {
        public BroadcastingTabRegionService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<BroadcastingTabRegion> Search(BroadcastingTabRegionSearchModel model)
        {
            return ctx.BroadcastingTabRegion;
        }
    }

    public class BroadcastingTabRegionSearchModel : QueryBuilderSearchModel
    {

    }
}
