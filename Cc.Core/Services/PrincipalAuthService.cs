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
    public interface IPrincipalAuthService : IBaseService<PrincipalAuth, long, CcDbContext>
    {
        IEnumerable<PrincipalAuth> Search(PrincipalAuthSearchModel model);
    }

    public class PrincipalAuthService : BaseService<PrincipalAuth, long, CcDbContext>, IPrincipalAuthService
    {
        private readonly ILogQueryService queryService;
        public PrincipalAuthService(ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
        }

        public IEnumerable<PrincipalAuth> Search(PrincipalAuthSearchModel model)
        {
            var query = ctx.PrincipalAuth.AsQueryable<PrincipalAuth>();
            return queryService.Execute("PrincipalAuth", model, query);
        }
    }

    public class PrincipalAuthSearchModel : QueryBuilderSearchModel
    {

    }
}
