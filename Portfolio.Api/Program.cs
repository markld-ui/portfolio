using Portfolio.Api.Configuration;
using Portfolio.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddPortfolioServices();

var app = builder.Build();
app.UseExceptionHandler();
app.UseForwardedHeaders();
app.UseRateLimiter();
app.Use(async (context, next) =>
{
    if (!Path.HasExtension(context.Request.Path) || context.Request.Path.Value?.EndsWith(".html", StringComparison.OrdinalIgnoreCase) == true)
    {
        context.Response.Headers.CacheControl = "no-cache, no-store, must-revalidate";
        context.Response.Headers.Pragma = "no-cache";
    }
    await next();
});

app.MapPortfolioEndpoints();
app.MapMethods(
    "/api/{**path}",
    ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    () => Results.NotFound());

app.Run();
