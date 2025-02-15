import { Resend } from "resend";
import LinearLoginCodeEmail from "~/emails";
import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

export default async function sendPWD(email: string, pwd: string) {
  const data = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Waitlist",
    react: LinearLoginCodeEmail({ validationCode: pwd }),
  });
  return data;
}
