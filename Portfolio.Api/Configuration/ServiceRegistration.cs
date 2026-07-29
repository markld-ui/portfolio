using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using Portfolio.Api.Services;

namespace Portfolio.Api.Configuration;

public static class ServiceRegistration
{
    public static IServiceCollection AddPortfolioServices(this IServiceCollection services)
    {
        services.AddProblemDetails();
        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            options.KnownIPNetworks.Clear();
            options.KnownProxies.Clear();
        });
        services.AddHttpClient<ContactDeliveryService>();
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.AddPolicy("contact", context => RateLimitPartition.GetFixedWindowLimiter(
                context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 3,
                    Window = TimeSpan.FromMinutes(10),
                    QueueLimit = 0
                }));
        });
        return services;
    }
}
