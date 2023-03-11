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
    public interface ICompanyService : IBaseService<Company, long, CcDbContext>
    {
        IEnumerable<Company> Search(CompanySearchModel model);
    }

    public class CompanyService : BaseService<Company, long, CcDbContext>, ICompanyService
    {
        private readonly ILogQueryService queryService;
        private readonly IIdentityService identityService;
        public CompanyService(IIdentityService identityService, ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.identityService = identityService;
            this.queryService = queryService;
            
            userId = identityService.GetName();
        }

        public override Company Find(long id)
        {
            return ctx.Company
                //.Include(x => x.CompanyDocument)
                .Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<Company> Search(CompanySearchModel model)
        {
            var query = ctx.Company.AsQueryable();

            if (model.CompanyId.HasValue)
                query = query.Where(x => x.Id == model.CompanyId);
            if (!string.IsNullOrWhiteSpace(model.BusinessName))
                query = query.Where(x => x.BusinessName.StartsWith(model.BusinessName));
            if (!string.IsNullOrWhiteSpace(model.VatCode))
                query = query.Where(x => x.VatCode.StartsWith(model.VatCode));

            query = query.OrderBy(x => x.BusinessName);

            return queryService.Execute("Company", model, query);
        }
    }

    public class CompanySearchModel : BaseSearchModel
    {
        public string BusinessName { get; set; }
        public string VatCode { get; set; }

    }
}