namespace angular_authAPI.Heiper
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email, string emailToken)
        {
            return $@"<html>
                    <head>
                    </head>
                    <body style=""margin:0;padding:0;font-family: Arial, Helvetica, sans-serif;"">
                        <div>
                            <div>
                                <h1> Reset your Password</h1>
                                <hr>
                                <p>You're receiving this e-mail because you requested a password reset for your let's Program account. </p>
                                <p>Please tap the button below to choose a new password.</p>
                                <a href=""http://localhost:4200/reset?email={email}&code={emailToken}"" target=""_blank"" style=""background:#0d6efc
                                color:white;border-radius:4px;display:block;margin:0 auto;width:50%;text-align:center;text-decoration:none"">Reset Password</a>
                                <p>Kind Regards, <br><br>
                                Let's Program</p>
                            </div>    
                        </div>
                    </body>

                </html>";
        }
    }
}
