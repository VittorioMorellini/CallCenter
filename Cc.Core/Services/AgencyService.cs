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
    public interface IAgencyService : IBaseService<Agency, long, CcDbContext>
    {
        IEnumerable<Agency> Search(AgencySearchModel model);
        Agency GetFirstAgency(long companyId);
    }

    public class AgencyService : BaseService<Agency, long, CcDbContext>, IAgencyService
    {
        private readonly IIdentityService identityService;
        private readonly ILogQueryService queryService;
        public AgencyService(IIdentityService identityService, ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
            this.identityService = identityService;
            
            userId = identityService.GetName();
        }

        /// <summary>
        /// Author: vmorell 20210224
        ///     Create Default agency if it does not exists
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public Agency GetFirstAgency(long companyId)
        {
            Agency result = ctx.Agency.Where(x => x.CompanyId == companyId).FirstOrDefault();

            if (result == null)
            {
                Agency agency = new Agency();
                agency.CompanyId = companyId;
                agency.Name = "Default";
                agency.InsertDate = DateTime.Now;
                //agency.InsertUser = identityService.GetName();
                agency.UpdateDate = DateTime.Now;
                //agency.UpdateUser = identityService.GetName();

                result = ctx.Save(agency.Id, agency);
            }

            return result;
        }

        public IEnumerable<Agency> Search(AgencySearchModel model)
        {
            var query = ctx.Agency.AsQueryable();
            long id = identityService.GetIdentityId();
            Principal principal = ctx.Principal.Where(principal => principal.Id == id).FirstOrDefault();
            
            if (model.CompanyId.HasValue)
                query = query.Where(x => x.CompanyId == model.CompanyId.GetValueOrDefault());

            if (model.AgencyId.HasValue)
                query = query.Where(x => x.Id == model.AgencyId.GetValueOrDefault());

            if (principal.Role != Role.ADMIN)
            {
                if (model.AgencyIds != null && model.AgencyIds.Count() > 0)
                    query = query.Where(x => model.AgencyIds.Contains(x.Id));
            }
            if (!string.IsNullOrWhiteSpace(model.ProvinceCode))
                query = query.Where(x => x.ProvinceCode.Equals(model.ProvinceCode));
            if (!string.IsNullOrWhiteSpace(model.CityCode))
                query = query.Where(x => x.CityCode.Equals(model.CityCode));
            if (!string.IsNullOrWhiteSpace(model.Code))
                query = query.Where(x => x.Code.StartsWith(model.Code));
            if (!string.IsNullOrWhiteSpace(model.Name))
                query = query.Where(x => x.Name.StartsWith(model.Name));
            if (!string.IsNullOrWhiteSpace(model.Address))
                query = query.Where(x => x.Address.StartsWith(model.Address));
            if (!string.IsNullOrWhiteSpace(model.Cap))
                query = query.Where(x => x.Cap.StartsWith(model.Cap));

            query = query.OrderBy(x => x.Name);

            return queryService.Execute("Agency", model, query);
        }
    }

    public class AgencySearchModel : BaseSearchModel
    {
        public string ProvinceCode { get; set; }
        public string CityCode { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Address { get; set; }
        public string Cap { get; set; }

    }
}
