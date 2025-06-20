// src/app/page.tsx
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Process } from "@/components/Process";
import { Trust } from "@/components/Trust";
import { Faq } from "@/components/Faq";
import { Form } from "@/components/Form";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-slate-950 text-gray-300">
      <Hero />
      <Problem />
      <Process />
      <Trust />
      <Faq />
      <Form />
      <Footer />
    </main>
  );
}
