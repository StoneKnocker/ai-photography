import type { Route } from "./+types/index";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Play,
  Skull,
  ShoppingCart,
  Flashlight,
  Users,
  Clock,
  Star,
  ExternalLink,
  Download,
  Target,
  Box,
  MessageCircle,
  Heart,
  MapPin,
  Music,
  Settings,
  Globe,
  Crown,
} from "lucide-react";
import Header from "~/components/header";
import { getCanonical, getHreflangs } from "~/lib/buildLink";
import { fallbackLng, supportedLngs } from "~/config/i18n";
import Footer from "~/components/footer";

export async function loader({ request, params }: Route.LoaderArgs) {
  const locale = params.locale || fallbackLng;

  return {
    locale,
    title: "Eleven Music - AI Music Generation Platform",
    description:
      "Generate studio-quality music instantly with AI. Create any genre, style, or vocal track in minutes using Eleven Music's advanced AI technology.",
  };
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> }) {
  const hreflangs = getHreflangs("/", supportedLngs);

  return [
    { title: data.title },
    {
      name: "description",
      content: data.description,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: getCanonical(data.locale, "/"),
    },
    // hreflang alternate links
    ...Object.entries(hreflangs).flatMap(([lang, url]) => [
      {
        tagName: "link",
        rel: "alternate",
        hrefLang: lang,
        href: url,
      },
    ]),
  ];
}

export default function HomePage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative px-4 pt-20 pb-32 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Generate studio-quality tracks instantly
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create any genre, any style, vocals or instrumental, in minutes
              using simple text prompts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              >
                Start Creating Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold shadow-lg"
                onClick={() => {
                  const element = document.getElementById("example-video");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Listen to Examples
              </Button>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="px-4 py-16 bg-gray-800/30" id="example-video">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              See Eleven Music in Action
            </h2>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/VDwTSuKbrg8?si=CnGaJbelsURkUdhC"
                title="Eleven Music Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <p className="text-gray-400 mt-6">
              Watch how Eleven Music creates professional-quality tracks in
              minutes
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 bg-gray-800/50" id="features">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Professional Music Generation
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-gray-800/80 border-gray-700 p-6 flex flex-col">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Music className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Studio-Grade Audio
                </h3>
                <p className="text-gray-400 text-left mt-auto">
                  44.1kHz high-quality audio with deep musical intelligence and
                  emotional fidelity
                </p>
              </Card>

              <Card className="bg-gray-800/80 border-gray-700 p-6 flex flex-col">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Complete Creative Control
                </h3>
                <p className="text-gray-400 text-left mt-auto">
                  Edit individual sections, control duration, lyrics, and style
                  per section
                </p>
              </Card>

              <Card className="bg-gray-800/80 border-gray-700 p-6 flex flex-col">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Multi-Language Support
                </h3>
                <p className="text-gray-400 text-left mt-auto">
                  Generate vocals in English, Spanish, French, German, Japanese,
                  and more
                </p>
              </Card>

              <Card className="bg-gray-800/80 border-gray-700 p-6 flex flex-col">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Commercial Use
                </h3>
                <p className="text-gray-400 text-left mt-auto">
                  Ready for film, TV, podcasts, advertising, gaming, and social
                  media
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Advanced Capabilities
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Section-by-Section Editing
                    </h3>
                    <p className="text-gray-400">
                      Edit individual song sections (Intro, Verse, Chorus, etc.)
                      with precise control over structure and arrangement
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Flashlight className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Genre Blending
                    </h3>
                    <p className="text-gray-400">
                      Seamlessly merge multiple genres and instruments to create
                      unique soundscapes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Instant Generation
                    </h3>
                    <p className="text-gray-400">
                      Create professional tracks in under 2 minutes with
                      real-time composition
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Emotional Intelligence
                    </h3>
                    <p className="text-gray-400">
                      Advanced understanding of musical structure and emotional
                      context
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Natural Language Processing
                    </h3>
                    <p className="text-gray-400">
                      Complex, multi-layered prompt comprehension for detailed
                      musical requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Professional Output
                    </h3>
                    <p className="text-gray-400">
                      128-192kbps MP3 quality with support for multiple audio
                      formats
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Perfect for Every Creator
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-800/80 border-gray-700 p-8 flex flex-col">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                  Content Creators
                </h3>
                <p className="text-gray-400 mb-6">
                  YouTubers, podcasters, and streamers can create custom
                  background music and sound effects
                </p>
                <ul className="space-y-2 text-gray-300 mt-auto">
                  <li>• Custom intro/outro music</li>
                  <li>• Background scores</li>
                  <li>• Sound effects</li>
                </ul>
              </Card>

              <Card className="bg-gray-800/80 border-gray-700 p-8 flex flex-col">
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                  Businesses
                </h3>
                <p className="text-gray-400 mb-6">
                  Elevate your brand with custom audio for advertisements,
                  presentations, and events
                </p>
                <ul className="space-y-2 text-gray-300 mt-auto">
                  <li>• Advertisement audio</li>
                  <li>• Brand soundtracks</li>
                  <li>• Event music</li>
                </ul>
              </Card>

              <Card className="bg-gray-800/80 border-gray-700 p-8 flex flex-col">
                <h3 className="text-2xl font-semibold mb-4 text-green-400">
                  Artists & Musicians
                </h3>
                <p className="text-gray-400 mb-6">
                  Experiment with new ideas and create professional backing
                  tracks instantly
                </p>
                <ul className="space-y-2 text-gray-300 mt-auto">
                  <li>• Song prototypes</li>
                  <li>• Backing tracks</li>
                  <li>• Creative inspiration</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="px-4 py-20 bg-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-300 mb-12">
              Eleven Music uses our proprietary, state-of-the-art AI model
              trained on millions of professional audio samples
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  44.1kHz
                </div>
                <div className="text-gray-400">Studio Quality</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  &lt;2min
                </div>
                <div className="text-gray-400">Generation Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  100+
                </div>
                <div className="text-gray-400">Genres & Styles</div>
              </div>
            </div>
          </div>
        </section>

        {/* API Integration Section */}
        <section className="px-4 py-20 bg-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              API Integration Coming Soon
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Programmatic music generation with complete control over style,
              structure, lyrics, and duration
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <Card className="bg-gray-800/80 border-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Developer Features
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    • Real-time track generation from natural language prompts
                  </li>
                  <li>• Complete control over musical parameters</li>
                  <li>• Integration into apps and creative workflows</li>
                  <li>• RESTful API with comprehensive documentation</li>
                </ul>
              </Card>
              <Card className="bg-gray-800/80 border-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Use Cases
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Custom music applications</li>
                  <li>• Automated content creation</li>
                  <li>• Game and interactive media</li>
                  <li>• Broadcast and production tools</li>
                </ul>
              </Card>
            </div>
            <div className="mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold shadow-lg"
              >
                Join API Waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Simple, Transparent Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-800/80 border-gray-700 p-8">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                  Starter
                </h3>
                <div className="text-4xl font-bold mb-6 text-white">Free</div>
                <ul className="space-y-3 text-gray-400 mb-8">
                  <li>• 10 minutes of music generation</li>
                  <li>• Basic quality output</li>
                  <li>• Personal use only</li>
                  <li>• Community support</li>
                </ul>
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                  Get Started
                </Button>
              </Card>
              <Card className="bg-gray-800/80 border-gray-700 p-8 border-blue-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                  Popular
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                  Creator
                </h3>
                <div className="text-4xl font-bold mb-6 text-white">
                  $5<span className="text-lg font-normal">/month</span>
                </div>
                <ul className="space-y-3 text-gray-400 mb-8">
                  <li>• 100 minutes of music generation</li>
                  <li>• Studio quality output</li>
                  <li>• Commercial rights included</li>
                  <li>• Priority support</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start Creating
                </Button>
              </Card>
              <Card className="bg-gray-800/80 border-gray-700 p-8">
                <h3 className="text-2xl font-semibold mb-4 text-green-400">
                  Business
                </h3>
                <div className="text-4xl font-bold mb-6 text-white">
                  $0.50<span className="text-lg font-normal">/minute</span>
                </div>
                <ul className="space-y-3 text-gray-400 mb-8">
                  <li>• Unlimited generation</li>
                  <li>• Premium quality output</li>
                  <li>• Full commercial rights</li>
                  <li>• Custom licensing options</li>
                  <li>• Dedicated support</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Contact Sales
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="px-4 py-20 bg-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Creating Great Prompts
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Use detailed descriptions of genre, mood, and style</li>
                  <li>• Specify instruments and vocal preferences</li>
                  <li>• Include tempo and emotional characteristics</li>
                  <li>• Reference similar artists for style guidance</li>
                  <li>• Experiment with different prompt structures</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Maximizing Quality
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Start with simple prompts and iterate</li>
                  <li>• Use section editing for precise control</li>
                  <li>• Take advantage of genre blending</li>
                  <li>• Review and refine generated tracks</li>
                  <li>• Save successful prompts for reuse</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Start Creating Today</h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of creators already using Eleven Music to produce
              professional-quality audio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              >
                Create Your First Track
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold shadow-lg"
              >
                View Pricing Plans
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
