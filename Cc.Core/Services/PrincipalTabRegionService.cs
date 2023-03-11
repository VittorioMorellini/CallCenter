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
    public interface IPrincipalTabRegionService : IBaseService<PrincipalTabRegion, long, CcDbContext>
    {
        IEnumerable<PrincipalTabRegion> Search(PrincipalTabRegionSearchModel model);
    }

    public class PrincipalTabRegionService : BaseService<PrincipalTabRegion, long, CcDbContext>, IPrincipalTabRegionService
    {
        public PrincipalTabRegionService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<PrincipalTabRegion> Search(PrincipalTabRegionSearchModel model)
        {
            var query = ctx.PrincipalTabRegion.AsQueryable();

            if (model.PrincipalId != null)
                query = query.Where(x => x.PrincipalId == model.PrincipalId.GetValueOrDefault());

            return query.ToList();
        }
    }

    public class PrincipalTabRegionSearchModel : QueryBuilderSearchModel
    {
        public long? PrincipalId { get; set; }
    }
}
