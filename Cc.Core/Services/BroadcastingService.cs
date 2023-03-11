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
    public interface IBroadcastingService : IBaseService<Broadcasting, long, CcDbContext>
    {
        IEnumerable<Broadcasting> Search(BroadcastingSearchModel model);
    }

    public class BroadcastingService : BaseService<Broadcasting, long, CcDbContext>, IBroadcastingService
    {
        public BroadcastingService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public override Broadcasting Find(long id)
        {
            return ctx.Broadcasting.Where(x => x.Id == id)
                .Include(x => x.BroadcastingProduct).ThenInclude(x => x.Product)
                .Include(x => x.BroadcastingTabRegion).ThenInclude(x => x.TabRegion)
                .FirstOrDefault();
        }

        public IEnumerable<Broadcasting> Search(BroadcastingSearchModel model)
        {
            return ctx.Broadcasting;
        }
    }

    public class BroadcastingSearchModel : QueryBuilderSearchModel
    {

    }
}
