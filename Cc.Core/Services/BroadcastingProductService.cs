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
    public interface IBroadcastingProductService : IBaseService<BroadcastingProduct, long, CcDbContext>
    {
        IEnumerable<BroadcastingProduct> Search(BroadcastingProductSearchModel model);
    }

    public class BroadcastingProductService : BaseService<BroadcastingProduct, long, CcDbContext>, IBroadcastingProductService
    {
        public BroadcastingProductService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<BroadcastingProduct> Search(BroadcastingProductSearchModel model)
        {
            return ctx.BroadcastingProduct;
        }
    }

    public class BroadcastingProductSearchModel : QueryBuilderSearchModel
    {

    }
}
