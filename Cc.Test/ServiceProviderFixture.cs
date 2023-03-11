
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Text;
using Cc.Core;
using Cc.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Cc.Test
{
    public class ServiceProviderFixture : IDisposable
    {
        public IConfiguration Configuration { get; private set; }
        public ServiceProvider Provider { get; private set; }

        public ServiceProviderFixture()
        {
            Provider = StartUp();
        }

        public void Dispose()
        {
            // ... clean up TESTUNIT
        }

        ServiceProvider StartUp()
        {
            // string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            Configuration = builder.Build();

            // add the framework services
            var services = new ServiceCollection().AddLogging();

            services.AddDbContext<CcDbContext>(
                options => options.UseSqlServer(Configuration.GetConnectionString("Callcenter")),
                ServiceLifetime.Transient
            );

            services.AddCcCoreTest(Configuration);

            return services.BuildServiceProvider();
        }
    }
}
