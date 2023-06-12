using angular_authAPI.Models;

namespace angular_authAPI.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);

    }
}
