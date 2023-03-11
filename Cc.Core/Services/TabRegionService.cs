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
    public interface ITabRegionService : IBaseService<TabRegion, long, CcDbContext>
    {
        IEnumerable<TabRegion> Search(TabRegionSearchModel model);
    }

    public class TabRegionService : BaseService<TabRegion, long, CcDbContext>, ITabRegionService
    {
        private readonly ILogQueryService queryService;
        public TabRegionService(ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
        }

        public IEnumerable<TabRegion> Search(TabRegionSearchModel model)
        {
            var query = ctx.TabRegion.AsQueryable();

            query = query.OrderBy(x => x.Description);

            return queryService.Execute("TabRegion", model, query);
        }
    }

    public class TabRegionSearchModel : QueryBuilderSearchModel
    {
        public long? TabRegionId { get; set; }
    }
}
