using System.ComponentModel.DataAnnotations;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

namespace Portfolio.Api.Endpoints;

public static class PortfolioEndpoints
{
    private static readonly ProjectDto[] Projects =
    [
        new("Project Lifecycle Service", "ASP.NET Core", 30, ["Clean Architecture", "CQRS", "FSM", "PostgreSQL"]),
        new("Event Platform API", "ASP.NET Core", 18, ["EF Core", "SQL Server", "JWT", "RBAC"])
    ];

    public static IEndpointRouteBuilder MapPortfolioEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/profile", () => Results.Ok(new
        {
            name = "Роман Слиньков",
            role = ".NET Backend Developer",
            location = "Томск, Россия",
            available = true
        }));
        endpoints.MapGet("/api/projects", () => Results.Ok(Projects));
        endpoints.MapGet("/api/contact/status", (ContactDeliveryService delivery) =>
            Results.Ok(new { directDelivery = delivery.IsConfigured }));
        endpoints.MapGet("/health", () => Results.Ok(new { status = "healthy" }));
        endpoints.MapPost("/api/contact", HandleContact).RequireRateLimiting("contact");
        return endpoints;
    }

    private static async Task<IResult> HandleContact(
        ContactRequest request,
        ContactDeliveryService delivery,
        ILoggerFactory loggerFactory,
        CancellationToken cancellationToken)
    {
        if (!string.IsNullOrWhiteSpace(request.Website))
            return Results.Accepted(value: new { message = "Message accepted" });

        var validationContext = new ValidationContext(request);
        var validationResults = new List<ValidationResult>();
        if (!Validator.TryValidateObject(request, validationContext, validationResults, true))
        {
            var errors = validationResults
                .GroupBy(result => result.MemberNames.FirstOrDefault() ?? "request")
                .ToDictionary(group => group.Key, group => group.Select(result => result.ErrorMessage ?? "Invalid value").ToArray());
            return Results.ValidationProblem(errors);
        }

        var logger = loggerFactory.CreateLogger("ContactEndpoint");
        if (!await delivery.SendAsync(request, cancellationToken))
        {
            logger.LogWarning("Contact delivery is unavailable. Configure Telegram settings.");
            return Results.Problem(
                "Сервис отправки временно недоступен. Используйте email или Telegram.",
                statusCode: StatusCodes.Status503ServiceUnavailable);
        }

        logger.LogInformation("Portfolio contact request delivered.");
        return Results.Accepted(value: new { message = "Message delivered" });
    }
}
