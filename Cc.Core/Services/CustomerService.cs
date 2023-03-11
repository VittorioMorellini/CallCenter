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
    public interface ICustomerService : IBaseService<Customer, long, CcDbContext>
    {
        IEnumerable<Customer> Search(CustomerSearchModel model);
        Customer FindByUniqueLogic(long companyId, long? agencyId, string taxCode);

    }

    public class CustomerService : BaseService<Customer, long, CcDbContext>, ICustomerService
    {
        private readonly ILogQueryService queryService;
        private readonly IIdentityService identityService;
        public CustomerService(IIdentityService identityService, ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.identityService = identityService;
            this.queryService = queryService;
            userId = identityService.GetName();
        }

        public override Customer Find(long id)
        {
            return ctx.Customer
                .Include(x => x.CustomerCall)
                .Where(x => x.Id == id)
                .FirstOrDefault();
        }

        public IEnumerable<Customer> Search(CustomerSearchModel model)
        {
            var query = ctx.Customer
                .AsSplitQuery()
                .Include(x => x.CustomerCall)
                .AsQueryable();

            if (model.CompanyId.HasValue)
                query = query.Where(x => x.CompanyId == model.CompanyId.GetValueOrDefault());

            if (model.Type == CustomerTypes.CORPORATE)
            {
                // per le Customere di tipo PRINCIPAL non filtriamo per l'agenzia sulla tabella Customera, ma per le agenzie sulle autorizzazioni del Principal correlato
                // applichiamo sempre questa logica anche qualora la model.CustomerVisibility sia uguale a PrincipalVisibility.Company
                //TODO
                //query.Include(x => x.PrincipalReference).ThenInclude(x => x.PrincipalAuth);
                //if (model.AgencyId.HasValue)
                //    query = query.Where(x => x.PrincipalReference.PrincipalAuth.Select(y => y.AgencyId).Contains(model.AgencyId.Value));

            }
            else
            {
                if (model.CustomerVisibility == ResourceVisibility.Personal)
                    query = query.Where(x => x.SalesmanId == model.PrincipalId.GetValueOrDefault());
                if (model.AgencyId.HasValue && model.CustomerVisibility != ResourceVisibility.Company)
                    query = query.Where(x => x.AgencyId == model.AgencyId.GetValueOrDefault());
                if (model.AgencyIds != null && model.AgencyIds.Count() > 0 && model.CustomerVisibility != ResourceVisibility.Company)
                    query = query.Where(x => model.AgencyIds.Contains(x.AgencyId.GetValueOrDefault()));
            }

            if (!string.IsNullOrWhiteSpace(model.LastName))
                query = query.Where(x => x.LastName.StartsWith(model.LastName));
            if (!string.IsNullOrWhiteSpace(model.FirstName))
                query = query.Where(x => x.FirstName.StartsWith(model.FirstName));
            if (!string.IsNullOrWhiteSpace(model.TaxCode))
                query = query.Where(x => x.TaxCode.StartsWith(model.TaxCode));
            if (!string.IsNullOrWhiteSpace(model.Type))
                query = query.Where(x => x.Type.Equals(model.Type));
            if (!string.IsNullOrWhiteSpace(model.Sex))
                query = query.Where(x => x.Sex.Equals(model.Sex));
            if (!string.IsNullOrWhiteSpace(model.Mail))
                query = query.Where(x => x.Mail.StartsWith(model.Mail));
            if (model.BirthDate.HasValue)
                query = query.Where(x => x.BirthDate == model.BirthDate);
            if (!string.IsNullOrWhiteSpace(model.City))
                query = query.Where(x => x.City.Equals(model.City));
            if (!string.IsNullOrWhiteSpace(model.Country))
                query = query.Where(x => x.Country.Equals(model.Country));
            if (!string.IsNullOrWhiteSpace(model.Cap))
                query = query.Where(x => x.Cap.StartsWith(model.Cap));

            query = query.ApplyPaging(model);

            return queryService.Execute("Customer", model, query);
        }

        public Customer FindByUniqueLogic(long companyId, long? agencyId, string taxCode)
        {
            var query = ctx.Customer
                .AsQueryable();

            query = query.Where(x => x.CompanyId == companyId);
            if (agencyId.HasValue)
                query = query.Where(x => x.AgencyId == agencyId.GetValueOrDefault());
            if (!string.IsNullOrWhiteSpace(taxCode))
                query = query.Where(x => x.TaxCode.ToLower() == taxCode.ToLower());

            return query.FirstOrDefault();
        }

    }

    public class CustomerSearchModel : BaseSearchModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TaxCode { get; set; }
        public string VatCode { get; set; }
        public string Type { get; set; }
        public string Sex { get; set; }
        public string Phone { get; set; }
        public string Mail { get; set; }
        public string MobilePhone { get; set; }
        public string Cap { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime? BirthDate { get; set; }
        public string IdentificationDocType { get; set; }
        public string IdentificationDocNumber { get; set; }
        public DateTime? IdentificationDocReleaseDate { get; set; }
        public DateTime? IdentificationDocExpirationDate { get; set; }
        public bool? Disabled { get; set; }
    }
}
