
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this tool completely anonymous?",
      answer: "Yes, our tool allows you to view Instagram stories without the account owner knowing. We do not require you to log in with your Instagram account, which means no trace is left behind."
    },
    {
      question: "Can I view private accounts?",
      answer: "No, our tool only works with public Instagram accounts. Due to Instagram's privacy settings, private accounts' content can only be viewed by approved followers."
    },
    {
      question: "How do I download Instagram stories?",
      answer: "After searching for a username and viewing their stories, simply click on the download button next to the story you want to save. The content will be downloaded to your device in its original quality."
    },
    {
      question: "Is there a limit to how many stories I can view?",
      answer: "No, there is no limit to how many public stories you can view. Our service is designed to handle multiple requests efficiently."
    },
    {
      question: "Do you store the content I view?",
      answer: "We do not store any of the content you view or download. Everything is processed in real-time and no personal information is collected or saved on our servers."
    },
    {
      question: "Is this service free to use?",
      answer: "Yes, our basic service is completely free to use. We support our platform through minimal, non-intrusive advertisements."
    },
    {
      question: "Does this work for Reels and Posts too?",
      answer: "Currently, our tool specializes in Instagram stories. We are working on expanding our features to include Reels and Posts in the future."
    }
  ];

  return (
    <section className="section bg-white" id="faq">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-instablue-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our Instagram story viewer
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-instablue-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      {/* Ad space below FAQ */}
      <div className="ad-container mt-12 max-w-3xl mx-auto">
        Advertisement Space
      </div>
    </section>
  );
};

export default FAQSection;
