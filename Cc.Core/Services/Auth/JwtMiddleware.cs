
using Cc.Core.Models.Auth;
using Cc.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Cc.Core.Services.Auth;

public class JwtMiddleware
{
//    private readonly RequestDelegate next;
//    private readonly AuthContext authContext;

//    public JwtMiddleware(RequestDelegate next, AuthContext authContext)
//    {
//        next = next;
//        authContext = authContext;
//    }

//    public async Task Invoke(HttpContext context, IPrincipalService principalService)
//    {
//        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

//        if (token != null)
//            attachUserToContext(context, principalService, token);

//        await next(context);
//    }

//    private void attachUserToContext(HttpContext context, IPrincipalService principalService, string token)
//    {
//        try
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.ASCII.GetBytes(authContext.JWTSecretKey);
//            tokenHandler.ValidateToken(token, new TokenValidationParameters
//            {
//                ValidateIssuerSigningKey = true,
//                IssuerSigningKey = new SymmetricSecurityKey(key),
//                ValidateIssuer = false,
//                ValidateAudience = false,
//                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
//                ClockSkew = TimeSpan.Zero
//            }, out SecurityToken validatedToken);

//            var jwtToken = (JwtSecurityToken)validatedToken;
//            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

//            // attach user to context on successful jwt validation
//            context.Items["User"] = principalService.Find(userId);
//        }
//        catch
//        {
//            // do nothing if jwt validation fails
//            // user is not attached to context so request won't have access to secure routes
//        }
//    }
}
