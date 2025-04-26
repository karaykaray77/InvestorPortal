import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BarChart3, Activity, Globe, Users, BookOpen, Calendar, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">IR</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-primary">IR Connect</span>
            </div>
          </Link>
          <div className="flex items-center space-x-2">
            <Link href="/auth">
              <Button variant="outline" className="hidden sm:inline-flex">Log In</Button>
            </Link>
            <Link href="/auth?tab=register">
              <Button>Sign Up Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-800 leading-tight">
                The Professional Network for 
                <span className="text-primary"> Investor Relations</span>
              </h1>
              <p className="mt-6 text-lg text-neutral-600 max-w-lg">
                IR Connect is the premier platform for IR professionals to network, access resources, find opportunities, and elevate their careers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href="/auth?tab=register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Join IR Connect
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-xl md:ml-10 aspect-video flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="IR professionals collaborating"
                  className="rounded-md w-full h-auto object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-lg">
                  <div className="text-primary text-lg font-bold">5,000+</div>
                  <div className="text-sm text-neutral-600">IR Professionals</div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                  <div className="text-primary text-lg font-bold">500+</div>
                  <div className="text-sm text-neutral-600">Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies/Social Proof */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm uppercase tracking-wider text-neutral-500 font-medium">
            Trusted by IR professionals from leading companies
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-10 opacity-70">
            <div className="h-7">
              <span className="text-lg font-semibold text-neutral-600">Goldman Sachs</span>
            </div>
            <div className="h-7">
              <span className="text-lg font-semibold text-neutral-600">JP Morgan</span>
            </div>
            <div className="h-7">
              <span className="text-lg font-semibold text-neutral-600">BlackRock</span>
            </div>
            <div className="h-7">
              <span className="text-lg font-semibold text-neutral-600">Morgan Stanley</span>
            </div>
            <div className="h-7">
              <span className="text-lg font-semibold text-neutral-600">Vanguard</span>
            </div>
            <div className="h-7">
              <span className="text-lg font-semibold text-neutral-600">Fidelity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
              Everything IR Professionals Need
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              IR Connect brings together all the essential tools and resources to help you excel in investor relations.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">IR Community</h3>
              <p className="mt-2 text-neutral-600">
                Connect with peers, share insights, and participate in discussions with other IR professionals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Analytics Dashboard</h3>
              <p className="mt-2 text-neutral-600">
                Track your professional growth, monitor industry trends, and gain valuable insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Job Marketplace</h3>
              <p className="mt-2 text-neutral-600">
                Find career opportunities, consulting gigs, and connect with companies looking for IR talent.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl border transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Resource Library</h3>
              <p className="mt-2 text-neutral-600">
                Access templates, guides, best practices, and industry whitepapers all in one place.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl border transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Events & Webinars</h3>
              <p className="mt-2 text-neutral-600">
                Stay updated on industry events, webinars, and networking opportunities.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl border transition-all hover:shadow-md">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800">Industry News</h3>
              <p className="mt-2 text-neutral-600">
                Get the latest IR industry news, regulatory updates, and market trends curated for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
              What IR Professionals Say
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Hear from IR professionals who've transformed their careers with IR Connect.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-neutral-800">Sarah Johnson</h4>
                  <p className="text-sm text-neutral-500">IR Director, Tech Inc.</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "IR Connect has revolutionized how I approach investor relations. The resources and community have been invaluable for my career development."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Michael Chen" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-neutral-800">Michael Chen</h4>
                  <p className="text-sm text-neutral-500">VP Investor Relations, Finance Corp</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "The job marketplace on IR Connect helped me land my dream role. The network of professionals is unmatched in our industry."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Aisha Washington" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-neutral-800">Aisha Washington</h4>
                  <p className="text-sm text-neutral-500">IR Consultant, Global Advisors</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "As a consultant, IR Connect has been essential for staying current with best practices and finding new clients through the marketplace."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Join the Leading IR Professional Network
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Connect with thousands of IR professionals, access industry-leading resources, and take your career to the next level.
          </p>
          <div className="mt-10">
            <Link href="/auth?tab=register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-white/80">
              Already a member? <Link href="/auth"><span className="text-white underline cursor-pointer">Sign in</span></Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">IR</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-white">IR Connect</span>
              </div>
              <p className="mt-4 text-neutral-400">
                The premier professional network for investor relations experts.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView()} className="text-neutral-400 hover:text-white transition-colors">Features</button></li>
                <li><button className="text-neutral-400 hover:text-white transition-colors">Community</button></li>
                <li><button className="text-neutral-400 hover:text-white transition-colors">Resources</button></li>
                <li><button className="text-neutral-400 hover:text-white transition-colors">Marketplace</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><button className="text-neutral-400 hover:text-white transition-colors">About Us</button></li>
                <li><button className="text-neutral-400 hover:text-white transition-colors">Careers</button></li>
                <li><button className="text-neutral-400 hover:text-white transition-colors">Contact</button></li>
                <li><button className="text-neutral-400 hover:text-white transition-colors">Blog</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><button className="text-neutral-400 hover:text-white transition-colors">Terms of Service</button></li>
                <li><button className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="text-neutral-400 hover:text-white transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
            <p>© {new Date().getFullYear()} IR Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}