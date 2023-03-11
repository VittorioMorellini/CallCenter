using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Cc.Test
{
    public class UnitTest1 : IClassFixture<ServiceProviderFixture>
    {
        ServiceProvider provider;
        public UnitTest1(ServiceProviderFixture fixture)
        {
            provider = fixture.Provider;
        }

        [Fact]
        public void Test1()
        {

        }
    }
}