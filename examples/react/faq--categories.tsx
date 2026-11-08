import { Faq } from "../../components/faq/Faq";

const items = [
  {
    question: "Is there a free trial?",
    answer: "Yes. Every plan starts with a 14 day trial, no card required.",
    category: "Billing",
  },
  {
    question: "Can I cancel at any time?",
    answer: "Yes. Your plan stays active until the end of the billing period.",
    category: "Billing",
  },
  {
    question: "Can I invite my team?",
    answer:
      "Invite as many members as your plan allows from the team settings.",
    category: "Account",
  },
  {
    question: "Where is my data stored?",
    answer: "Data is stored in Jakarta and backed up every day.",
    category: "Security",
  },
];

export default function FaqCategoriesExample() {
  return (
    <Faq
      variant="categories"
      title="Frequently asked questions"
      exclusive
      items={items}
    />
  );
}
