namespace Portfolio.Api.Models;

public sealed record ProjectDto(
    string Name,
    string Platform,
    int Endpoints,
    string[] Highlights);
