using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Cc.Core.Models;
using Cc.Core.Services;
using Cc.Core.Utils;
using Cc.Core.Models.Auth;
using Cc.Core.Services.Auth;

namespace Cc.Core
{
    public static class ServiceCollectionUtils
    {
        public static void AddCcCore(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IServiceFactory, ServiceFactory>();
            services.AddCore(configuration);
        }

        public static void AddCcCoreTest(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IServiceFactory, ServiceTestFactory>();
            services.AddCore(configuration);
        }

        public static void AddCcCoreBatch(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IServiceFactory, ServiceBatchFactory>();
            services.AddCore(configuration);
        }

        private static void AddCore(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(configuration);

            services.AddScoped(x => x.GetService<IServiceFactory>().Principal);
            services.AddScoped(x => x.GetService<IServiceFactory>().Identity);
            services.AddScoped(x => x.GetService<IServiceFactory>().Product);
            services.AddScoped(x => x.GetService<IServiceFactory>().Company);
            services.AddScoped(x => x.GetService<IServiceFactory>().Configuration);
            services.AddScoped(x => x.GetService<IServiceFactory>().Document);
            services.AddScoped(x => x.GetService<IServiceFactory>().LogQuery);
            services.AddScoped(x => x.GetService<IServiceFactory>().Agency);
            services.AddScoped(x => x.GetService<IServiceFactory>().PrincipalAuth);
            services.AddScoped(x => x.GetService<IServiceFactory>().TabCountry);
            services.AddScoped(x => x.GetService<IServiceFactory>().TabCity);
            services.AddScoped(x => x.GetService<IServiceFactory>().TabDistrict);
            services.AddScoped(x => x.GetService<IServiceFactory>().TabRegion);
            //services.AddScoped(x => x.GetService<IServiceFactory>().Region);
            services.AddScoped(x => x.GetService<IServiceFactory>().Customer);
            services.AddScoped(x => x.GetService<IServiceFactory>().CustomerCall);
            services.AddScoped(x => x.GetService<IServiceFactory>().CustomerRequiredField);
            services.AddScoped(x => x.GetService<IServiceFactory>().PrincipalTabRegion);
            services.AddScoped(x => x.GetService<IServiceFactory>().Broadcasting);
            services.AddScoped(x => x.GetService<IServiceFactory>().BroadcastingTabRegion);
            services.AddScoped(x => x.GetService<IServiceFactory>().BroadcastingProduct);
            services.AddScoped(x => x.GetService<IServiceFactory>().Category);
            services.AddScoped(x => x.GetService<IServiceFactory>().Investment);
            services.AddScoped(x => x.GetService<IServiceFactory>().Measure);
            services.AddScoped(x => x.GetService<IServiceFactory>().EventType);
            services.AddScoped(x => x.GetService<IServiceFactory>().WarehouseType);
            services.AddScoped(x => x.GetService<IServiceFactory>().Warehouse);
            services.AddScoped(x => x.GetService<IServiceFactory>().Commission);
            services.AddScoped(x => x.GetService<IServiceFactory>().Appointment);
            services.AddScoped(x => x.GetService<IServiceFactory>().AppointmentType);
            services.AddScoped(x => x.GetService<IServiceFactory>().AppointmentReject);
            services.AddScoped(x => x.GetService<IServiceFactory>().AppointmentEnding);
        }
    }

    public interface IServiceFactory
    {
        IPrincipalService Principal { get; }
        IIdentityService Identity { get; }
        IProductService Product { get; }
        ILogQueryService LogQuery { get; }
        ICompanyService Company { get; }
        IConfigurationService Configuration { get; }
        IDocumentService Document { get; }
        IAgencyService Agency { get; }
        IPrincipalAuthService PrincipalAuth { get; }
        ITabCountryService TabCountry { get; }
        ITabCityService TabCity { get; }
        ITabDistrictService TabDistrict { get; }
        ITabRegionService TabRegion { get; }
        //IRegionService Region { get; }
        ICustomerService Customer { get; }
        ICustomerRequiredFieldService CustomerRequiredField { get; }
        IPrincipalTabRegionService PrincipalTabRegion { get; }
        IBroadcastingService Broadcasting { get; }
        IBroadcastingProductService BroadcastingProduct { get; }
        IBroadcastingTabRegionService BroadcastingTabRegion { get; }
        ICategoryService Category { get; }
        ICustomerCallService CustomerCall { get; }
        IInvestmentService Investment { get; }
        IMeasureService Measure { get; }
        IEventTypeService EventType { get; }
        IWarehouseTypeService WarehouseType { get; }
        IWarehouseService Warehouse { get; }
        ICommissionService Commission { get; }
        IAppointmentService Appointment { get; }
        IAppointmentEndingService AppointmentEnding { get; }
        IAppointmentRejectService AppointmentReject { get; }
        IAppointmentTypeService AppointmentType { get; }
    }

    public class ServiceFactory : IServiceFactory
    {
        protected readonly IServiceProvider provider;

        public ServiceFactory(IServiceProvider provider)
        {
            this.provider = provider;

            //Z.EntityFramework.Extensions.LicenseManager.AddLicense("2907;101-Sixtema", "da204260-a12d-2135-7628-1ad431e513f8");
            //if (!Z.EntityFramework.Extensions.LicenseManager.ValidateLicense(out string licenseErrorMessage))
            //    throw new Exception(licenseErrorMessage);
        }

        protected CcDbContext dbContext => (CcDbContext)provider.GetService(typeof(CcDbContext));

        public IPrincipalService Principal => new PrincipalService(
            (ILogger<PrincipalService>)provider.GetService(typeof(ILogger<PrincipalService>)),
            dbContext);
        public IPrincipalAuthService PrincipalAuth => new PrincipalAuthService(
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public virtual IIdentityService Identity => new IdentityService(
            (IHttpContextAccessor)provider.GetService(typeof(IHttpContextAccessor)),
            (AuthContext)provider.GetService(typeof(AuthContext)),
            dbContext);
        public virtual IProductService Product => new ProductService(
            (IIdentityService)provider.GetService(typeof(IIdentityService)),
            dbContext);
        public virtual IConfigurationService Configuration => new ConfigurationService(
            (IIdentityService)provider.GetService(typeof(IIdentityService)),
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        
        public virtual ILogQueryService LogQuery => new LogQueryService(
            (IConfiguration)provider.GetService(typeof(IConfiguration)),
            (IIdentityService)provider.GetService(typeof(IIdentityService)),
            dbContext);

        public virtual ICompanyService Company => new CompanyService(
            (IIdentityService)provider.GetService(typeof(IIdentityService)),
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public virtual IDocumentService Document => new DocumentService(
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public virtual IAgencyService Agency => new AgencyService(
            (IIdentityService)provider.GetService(typeof(IIdentityService)),
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public virtual ITabCountryService TabCountry => new TabCountryService(
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public virtual ITabCityService TabCity => new TabCityService(
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public virtual ITabDistrictService TabDistrict => new TabDistrictService(
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public virtual ITabRegionService TabRegion => new TabRegionService(
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        //public virtual IRegionService Region => new RegionService(
        //    (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
        //    dbContext);
        public virtual ICustomerService Customer => new CustomerService(
            (IIdentityService)provider.GetService(typeof(IIdentityService)),
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public virtual ICustomerRequiredFieldService CustomerRequiredField => new CustomerRequiredFieldService(
            (ILogQueryService)provider.GetService(typeof(ILogQueryService)),
            dbContext);
        public IPrincipalTabRegionService PrincipalTabRegion => new PrincipalTabRegionService(
            dbContext);
        public IBroadcastingService Broadcasting => new BroadcastingService(
            dbContext);
        public IBroadcastingProductService BroadcastingProduct => new BroadcastingProductService(
            dbContext);
        public IBroadcastingTabRegionService BroadcastingTabRegion => new BroadcastingTabRegionService(
            dbContext);
        public ICategoryService Category => new CategoryService(
            dbContext);
        public ICustomerCallService CustomerCall => new CustomerCallService(dbContext);
        public IInvestmentService Investment => new InvestmentService(dbContext);
        public IMeasureService Measure => new MeasureService(dbContext);
        public IEventTypeService EventType => new EventTypeService(dbContext);
        public IWarehouseTypeService WarehouseType => new WarehouseTypeService(dbContext);
        public IWarehouseService Warehouse => new WarehouseService(dbContext);
        public ICommissionService Commission => new CommissionService(dbContext);
        public IAppointmentService Appointment => new AppointmentService(dbContext);
        public IAppointmentEndingService AppointmentEnding => new AppointmentEndingService(dbContext);
        public IAppointmentTypeService AppointmentType => new AppointmentTypeService(dbContext);
        public IAppointmentRejectService AppointmentReject => new AppointmentRejectService(dbContext);
    }

    //public virtual JwtMiddleware Middleware => new JwtMiddleware(
    //    (RequestDelegate)provider.GetService(typeof(RequestDelegate)),
    //    (AuthContext)provider.GetService(typeof(AuthContext))
    //    );

    public class ServiceBatchFactory : ServiceFactory
    {
        public ServiceBatchFactory(IServiceProvider provider) : base(provider)
        {
        }

        public override IIdentityService Identity => new IdentityMockService("BATCH", "BATCH");
    }

    public class ServiceTestFactory : ServiceFactory
    {
        public ServiceTestFactory(IServiceProvider provider) : base(provider)
        {
        }

        public override IIdentityService Identity => new IdentityMockService("TEST", "BATCH");
    }
}
