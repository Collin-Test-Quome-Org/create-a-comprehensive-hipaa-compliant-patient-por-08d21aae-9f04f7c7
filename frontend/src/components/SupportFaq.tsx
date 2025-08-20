import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MessageCircleQuestion, ShieldCheck, CalendarCheck2, FileText, Stethoscope, LockKeyhole, UserPlus } from 'lucide-react'

export const SupportFaq = () => (
  <section className="w-full max-w-2xl mx-auto my-10">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
      <MessageCircleQuestion className="inline-block w-6 h-6 text-secondary" />
      Frequently Asked Questions
    </h2>
    <Accordion type="single" collapsible className="bg-white rounded-lg shadow">
      <AccordionItem value="what-is-portal">
        <AccordionTrigger id="faq-what-is-portal">
          What is the HIPAA Patient Portal?
        </AccordionTrigger>
        <AccordionContent>
          Our portal, SecureCare Connect, empowers you to access your medical records, schedule appointments, manage prescriptions, and communicate securely with your care team—all in one protected hub.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="how-to-appointment">
        <AccordionTrigger id="faq-how-to-appointment">
          <CalendarCheck2 className="inline-block mr-2 text-primary" /> How do I schedule or manage appointments?
        </AccordionTrigger>
        <AccordionContent>
          Navigate to "Appointments" from your dashboard to view, book, or manage your upcoming visits. Our intuitive calendar makes it simple to find the right time with your provider.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="medical-records">
        <AccordionTrigger id="faq-medical-records">
          <FileText className="inline-block mr-2 text-primary" /> How do I see my medical records and lab results?
        </AccordionTrigger>
        <AccordionContent>
          Click on "Medical Records" to securely view, download, or share your healthcare documents and latest lab results. We notify you as soon as new results arrive.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="prescription-refill">
        <AccordionTrigger id="faq-prescription-refill">
          <Stethoscope className="inline-block mr-2 text-primary" /> Can I request prescription refills online?
        </AccordionTrigger>
        <AccordionContent>
          Absolutely! Under "Prescriptions," you can check your medications and request refills in a few clicks. Our team will update you as soon as your request is processed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security-privacy">
        <AccordionTrigger id="faq-security-privacy">
          <ShieldCheck className="inline-block mr-2 text-primary" /> How is my information protected?
        </AccordionTrigger>
        <AccordionContent>
          We employ state-of-the-art encryption, strict access controls, and HIPAA-compliant safeguards to ensure your data stays private and secure—always.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="mfa">
        <AccordionTrigger id="faq-mfa">
          <LockKeyhole className="inline-block mr-2 text-primary" /> What is multi-factor authentication (MFA)?
        </AccordionTrigger>
        <AccordionContent>
          MFA adds an extra layer of security to your account. After entering your password, you'll verify your identity with a code sent to your device. This keeps your health information safe.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="register">
        <AccordionTrigger id="faq-register">
          <UserPlus className="inline-block mr-2 text-primary" /> How do I register for an account?
        </AccordionTrigger>
        <AccordionContent>
          Click "Register" on the login page and follow the instructions. If you need help, our support team is here for you.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
)
