import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import TicketSection from "@/components/TicketSection";
import EventDetails from "@/components/EventDetails";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <AnnouncementBar />
      <Hero />
      <div className="checkerboard" />
      <TicketSection />
      <Features />
      <div className="checkerboard" />
      <EventDetails />
      <div className="checkerboard" />
      <Footer />
    </main>
  );
}
