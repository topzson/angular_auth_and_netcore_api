using angular_authAPI.Models;
using System;
namespace angular_authAPI.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);

    }
}
