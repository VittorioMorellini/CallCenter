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
    public interface IRegionService : IBaseService<Region, long, CcDbContext>
    {
        IEnumerable<Region> Search(RegionSearchModel model);
    }

    public class RegionService : BaseService<Region, long, CcDbContext>, IRegionService
    {
        private readonly ILogQueryService queryService;
        public RegionService(ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
        }

        public IEnumerable<Region> Search(RegionSearchModel model)
        {
            var query = ctx.Region.AsQueryable();
            return queryService.Execute("Region", model, query);
        }
    }

    public class RegionSearchModel : QueryBuilderSearchModel
    {

    }
}
