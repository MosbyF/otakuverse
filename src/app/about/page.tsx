
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About OtakuVerse</h1>
        </div>

        <div className="space-y-8 text-lg leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Our Mission</h2>
            <p>
              At OtakuVerse, our mission is to create a vibrant, inclusive, and engaging community for anime and manga enthusiasts worldwide. We believe that these incredible art forms are more than just entertainment; they are gateways to new worlds, diverse cultures, and profound stories. We are dedicated to providing a high-quality platform where fans can discover, discuss, and celebrate their favorite titles.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">Join Our Universe</h2>
            <p>
              Whether you're a seasoned otaku or just beginning your journey, we welcome you. Explore new genres, find your next obsession, and connect with fellow fans who share your passion. OtakuVerse is more than a website; it's a community. Welcome home.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
