using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.Models;

public sealed record ContactRequest(
    [property: Required, MinLength(2), MaxLength(80)] string Name,
    [property: Required, EmailAddress, MaxLength(160)] string Email,
    [property: Required, MinLength(10), MaxLength(3000)] string Message,
    [property: MaxLength(200)] string? Website);
