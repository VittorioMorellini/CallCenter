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
    public interface ICustomerRequiredFieldService : IBaseService<CustomerRequiredField, long, CcDbContext>
    {
        IEnumerable<CustomerRequiredField> Search(CustomerRequiredFieldSearchModel model);
        CustomerRequiredField GetRequired(CustomerRequiredFieldSearchModel model);
    }

    public class CustomerRequiredFieldService : BaseService<CustomerRequiredField, long, CcDbContext>, ICustomerRequiredFieldService
    {
        private readonly ILogQueryService queryService;
        public CustomerRequiredFieldService(ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
        }

        public IEnumerable<CustomerRequiredField> Search(CustomerRequiredFieldSearchModel model)
        {
            var query = ctx.CustomerRequiredField.AsQueryable<CustomerRequiredField>();

            if (model.ProcessTypeId.HasValue)
                query = query.Where(x => x.CompanyId == model.CompanyId);
            if (model.AgencyId.HasValue)
                query = query.Where(x => x.AgencyId == model.AgencyId);
            if (model.ProductId.HasValue)
                query = query.Where(x => x.ProductId == model.ProductId);

            query = query
                .OrderByDescending(x => x.CompanyId)
                .ThenByDescending(x => x.AgencyId)
                .ThenByDescending(x => x.ProductId)
                ;

            return queryService.Execute("CustomerRequiredField", model, query);
        }

        public CustomerRequiredField GetRequired(CustomerRequiredFieldSearchModel model)
        {
            return queryService.Execute("CustomerRequiredField", model, GetQueryRequired(model)).FirstOrDefault();
        }

        private IQueryable<CustomerRequiredField> GetQueryRequired(CustomerRequiredFieldSearchModel model)
        {
            var query = ctx.CustomerRequiredField.AsQueryable<CustomerRequiredField>();  
            
            query = query.Where(x => x.CompanyId == model.CompanyId || x.CompanyId == null);
            query = query.Where(x => x.AgencyId == model.AgencyId || x.AgencyId == null);
            query = query.Where(x => x.ProductId == model.ProductId || x.ProductId == null);

            query = query
                .OrderByDescending(x => x.CompanyId)
                .ThenByDescending(x => x.AgencyId)
                .ThenByDescending(x => x.ProductId)
                ;

            return query;
        }
    }

    public class CustomerRequiredFieldSearchModel : QueryBuilderSearchModel
    {
        public long? ProcessTypeId { get; set; }
        public long? CompanyId { get; set; }
        public long? AgencyId { get; set; }
        public long? FlowId { get; set; }
        public long? ProductId { get; set; }
        public long? SignerTypeId { get; set; }
    }
}
