using System.Net.Http.Json;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public sealed class ContactDeliveryService(HttpClient httpClient, IConfiguration configuration)
{
    public bool IsConfigured =>
        !string.IsNullOrWhiteSpace(configuration["Telegram:BotToken"]) &&
        !string.IsNullOrWhiteSpace(configuration["Telegram:ChatId"]);

    public async Task<bool> SendAsync(ContactRequest request, CancellationToken cancellationToken)
    {
        var token = configuration["Telegram:BotToken"];
        var chatId = configuration["Telegram:ChatId"];
        if (string.IsNullOrWhiteSpace(token) || string.IsNullOrWhiteSpace(chatId))
            return false;

        var text = $"""
            Новое сообщение с портфолио

            Имя: {request.Name.Trim()}
            Email: {request.Email.Trim()}

            {request.Message.Trim()}
            """;

        using var response = await httpClient.PostAsJsonAsync(
            $"https://api.telegram.org/bot{token}/sendMessage",
            new { chat_id = chatId, text },
            cancellationToken);
        return response.IsSuccessStatusCode;
    }
}
