using Cc.Api.Handlers;
using Cc.Api.Helpers;
using Cc.Core;
using Cc.Core.Models;
using Cc.Core.Models.Auth;
using Cc.Core.Services.Auth;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
Microsoft.Extensions.Configuration.IConfiguration configuration = builder.Configuration;

var logger = new LoggerConfiguration()
               .MinimumLevel.Information()
               .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
               .Enrich.FromLogContext()
               .WriteTo.RollingFile("logs/{Date}.txt")
               .CreateLogger();

builder.Logging.AddSerilog(logger);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true; 
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(configuration["Auth:JWTSecretKey"])
                        )
                    };
                });

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(builder =>
        //builder.WithOrigins("http://localhost:3000")
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
));

builder.Services.AddControllers()
    .AddNewtonsoftJson(o => o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

//builder.Services.AddMvc().AddJsonOptions(o => o.JsonSerializerOptions.ReferenceHandler = ).
builder.Services.AddDbContext<CcDbContext>(
    builder => builder.UseSqlServer(configuration.GetConnectionString("Callcenter")),
    // è necessario che sia Transient poichè ho necessità di compiere azioni asincrone
    // ogni Service così ha la propria versione unica del DbContext (con la propria connessione)
    ServiceLifetime.Transient
);
builder.Services.AddSingleton(new AuthContext()
{
    JWTSecretKey = configuration["Auth:JWTSecretKey"],
    JWTLifespan = configuration["Auth:JWTLifespan"],
});

builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddCcCore(configuration);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//this may crash the redirection of cors
//app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
//app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
