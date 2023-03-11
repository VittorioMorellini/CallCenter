using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Cc.Core.Models;
using Cc.Core.Utils;
using Cc.Core.Services;

namespace Cc.Core.Services
{
    public interface IConfigurationService : IBaseService<Configuration, long, CcDbContext>
    {
        IEnumerable<Configuration> Search(ConfigurationSearchModel model);
        Configuration GetGlobal();
        Configuration GetByCompany(long companyId);
    }

    public class ConfigurationService : BaseService<Configuration, long, CcDbContext>, IConfigurationService
    {
        private readonly ILogQueryService queryService;
        private readonly IIdentityService identityService;
        public ConfigurationService(IIdentityService identityService, ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.identityService = identityService;
            this.queryService = queryService;
            //userId = identityService.GetName();
        }

        public Configuration GetByCompany(long companyId)
        {
            var global = GetGlobal();
            if (companyId == 0)
                return global;

            var item = ctx.Configuration.Where(x => x.CompanyId == companyId).FirstOrDefault();
            if (item == null)
                return global;

            return Resolve(item, global);
        }

        public Configuration GetGlobal()
        {
            return ctx.Configuration.Where(x => x.CompanyId == null).FirstOrDefault();
        }

        public IEnumerable<Configuration> Search(ConfigurationSearchModel model)
        {
            var global = GetGlobal();
            var query = ctx.Configuration.AsQueryable();
            if (model.CompanyId.HasValue)
                query = query.Where(x => x.CompanyId == model.CompanyId);

            // query = query.OrderBy(x => x.CompanyId).ThenBy(x => x.Company.BusinessName);
            var list = query.ToList();
            if (model.Resolved)
                list.ForEach(x => Resolve(x, global));

            return list;
        }

        private Configuration Resolve(Configuration item, Configuration global)
        {
            if (item.CompanyId == null)
                return item;

            var excluded = new string[] { "Id", "InsertDate", "UpdateDate", "InsertUser", "UpdateUser", "CompanyId", "AgencyId" };
            foreach (var prop in item.GetType().GetProperties().Where(x => !excluded.Contains(x.Name)))
            {
                var g = prop.GetValue(global);
                var l = prop.GetValue(item);
                if (l == null || l.ToString().Trim() == "")
                    prop.SetValue(item, g);
            }

            return item;
        }

    }

    public class ConfigurationSearchModel : BaseSearchModel
    {
        public bool Resolved { get; set; }
    }
}
