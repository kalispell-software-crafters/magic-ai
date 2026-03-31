import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Sparkles, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MTG AI Assistant
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your intelligent companion for Magic: The Gathering. 
              Ask questions, find cards, and explore the multiverse with AI.
            </p>
            <Link href="/chat">
              <Button size="lg" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                Start Chatting
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What You Can Do</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Search className="h-10 w-10 mb-2 text-blue-500" />
                  <CardTitle>Find Cards</CardTitle>
                  <CardDescription>
                    Search for cards by name, color, type, or even artwork description
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "Show me all blue cards with trees in the artwork"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-10 w-10 mb-2 text-purple-500" />
                  <CardTitle>Commander Focus</CardTitle>
                  <CardDescription>
                    Get recommendations and insights for Commander format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "What are good counterspells for my Atraxa deck?"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MessageSquare className="h-10 w-10 mb-2 text-green-500" />
                  <CardTitle>Natural Conversation</CardTitle>
                  <CardDescription>
                    Chat naturally about rules, strategies, and card interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "How does hexproof interact with board wipes?"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
            <p className="text-muted-foreground mb-8">
              Start chatting with the MTG AI Assistant and discover cards, 
              strategies, and answers to all your Magic questions.
            </p>
            <Link href="/chat">
              <Button size="lg" variant="outline">
                Launch Chat Interface
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            This is unofficial Fan Content permitted under the{" "}
            <a 
              href="https://company.wizards.com/en/legal/fancontentpolicy"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fan Content Policy
            </a>.
          </p>
          <p className="mt-2">
            Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.
          </p>
        </div>
      </footer>
    </div>
  );
}
