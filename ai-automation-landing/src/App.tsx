import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Bot, Zap, Clock, TrendingUp, CheckCircle, Code, Database, Workflow, MessageSquare, Calendar, FileText, Play, Mail, Phone, Building2, Users, DollarSign, Star, X } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NotificationManager, useNotifications } from "./components/notifications";
import { 
  ScrollProgress, 
  FloatingActionButton, 
  MouseTracker, 
  ScrollToTop, 
  FloatingElements,
  MagneticButton,
  SparkleEffect,
  TypewriterText
} from "./components/interactive-effects";
import { useRef, useEffect, useState } from "react";

// Form schemas
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name is required"),
  employees: z.string().min(1, "Please select company size"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

const demoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name is required"),
  useCase: z.string().min(5, "Please describe your use case")
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type DemoFormData = z.infer<typeof demoFormSchema>;

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      const animation = count.set(end);
      return animation;
    }
  }, [count, end, inView]);

  return (
    <motion.div ref={ref} className="text-3xl font-bold text-primary">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.div>
  );
}

// Video Modal Component
function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="group backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-primary/10"
        >
          <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Watch Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 bg-black">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-white">Horizon Labs Demo</DialogTitle>
          <DialogDescription className="text-gray-300">
            See how our minimalist AI automation platform transforms business operations
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video bg-gray-900 rounded-lg m-6 mt-4 flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="h-16 w-16 mx-auto mb-4 opacity-60" />
            <p className="text-gray-400">Demo video would be embedded here</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Contact Form Modal
function ContactFormModal({ addNotification }: { addNotification: (notification: { type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string; }) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    console.log("Contact form submitted:", data);
    addNotification({
      type: "success",
      title: "Trial Started!",
      message: "We'll get back to you within 24 hours."
    });
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="group glow">
          Start Free 30-Day Trial
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Start Your Free Trial</DialogTitle>
          <DialogDescription>
            Tell us about your business and we'll set up your AI automation platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="John Doe"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@company.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              {...register("company")}
              placeholder="Acme Corp"
              className={errors.company ? "border-red-500" : ""}
            />
            {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="employees">Company Size</Label>
            <Select onValueChange={(value) => register("employees").onChange({ target: { value } })}>
              <SelectTrigger className={errors.employees ? "border-red-500" : ""}>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-1000">201-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
            {errors.employees && <p className="text-sm text-red-500 mt-1">{errors.employees.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="message">What would you like to automate?</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Tell us about your current processes and challenges..."
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Setting up your trial..." : "Start Free Trial"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Demo Request Modal
function DemoModal({ addNotification }: { addNotification: (notification: { type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string; }) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema)
  });

  const onSubmit = async (data: DemoFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Demo form submitted:", data);
    addNotification({
      type: "success",
      title: "Demo Scheduled!",
      message: "Check your email for meeting details."
    });
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="backdrop-blur-sm">
          Book Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Personalized Demo</DialogTitle>
          <DialogDescription>
            Schedule a 30-minute demo to see Horizon Labs in action.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="demo-name">Full Name</Label>
            <Input
              id="demo-name"
              {...register("name")}
              placeholder="John Doe"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="demo-email">Work Email</Label>
            <Input
              id="demo-email"
              type="email"
              {...register("email")}
              placeholder="john@company.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="demo-company">Company Name</Label>
            <Input
              id="demo-company"
              {...register("company")}
              placeholder="Acme Corp"
              className={errors.company ? "border-red-500" : ""}
            />
            {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="demo-usecase">What would you like to see?</Label>
            <Textarea
              id="demo-usecase"
              {...register("useCase")}
              placeholder="Document processing, workflow automation, etc."
              className={errors.useCase ? "border-red-500" : ""}
            />
            {errors.useCase && <p className="text-sm text-red-500 mt-1">{errors.useCase.message}</p>}
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Scheduling demo..." : "Schedule Demo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const { notifications, addNotification, removeNotification } = useNotifications();
  const caseStudies = [
    {
      company: "TechFlow Corp",
      industry: "SaaS",
      challenge: "Manual customer onboarding taking 2-3 weeks",
      solution: "AI-powered onboarding automation with document processing",
      results: {
        timeReduction: "85%",
        costSavings: "$180k/year",
        satisfaction: "94%"
      },
      metrics: [
        { label: "Onboarding Time", before: "14 days", after: "2 days" },
        { label: "Manual Tasks", before: "47", after: "7" },
        { label: "Customer Satisfaction", before: "76%", after: "94%" }
      ]
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      challenge: "Inventory management and demand forecasting inefficiencies",
      solution: "ML-driven inventory optimization with real-time demand prediction",
      results: {
        timeReduction: "70%",
        costSavings: "$320k/year",
        satisfaction: "91%"
      },
      metrics: [
        { label: "Stockout Reduction", before: "23%", after: "6%" },
        { label: "Overstock Reduction", before: "31%", after: "8%" },
        { label: "Forecast Accuracy", before: "67%", after: "89%" }
      ]
    },
    {
      company: "FinanceFlow",
      industry: "Financial Services",
      challenge: "Manual invoice processing and approval workflows",
      solution: "AI document extraction with intelligent approval routing",
      results: {
        timeReduction: "92%",
        costSavings: "$450k/year",
        satisfaction: "96%"
      },
      metrics: [
        { label: "Processing Time", before: "4.5 hours", after: "22 minutes" },
        { label: "Error Rate", before: "12%", after: "1.2%" },
        { label: "Approval Speed", before: "3-5 days", after: "Same day" }
      ]
    }
  ];

  const components = [
    {
      name: "Smart Document Processor",
      description: "AI-powered document extraction and classification with 99.2% accuracy",
      icon: FileText,
      features: ["OCR + NLP Processing", "Multi-format Support", "Real-time Validation", "API Integration"]
    },
    {
      name: "Intelligent Chat Bot",
      description: "Conversational AI that understands context and performs complex actions",
      icon: MessageSquare,
      features: ["Natural Language Understanding", "Multi-turn Conversations", "Action Execution", "Learning from Interactions"]
    },
    {
      name: "Workflow Orchestrator",
      description: "Visual workflow builder with AI-powered decision nodes and error handling",
      icon: Workflow,
      features: ["Drag & Drop Builder", "Conditional Logic", "Error Recovery", "Performance Analytics"]
    },
    {
      name: "Predictive Analytics Engine",
      description: "ML models for forecasting, anomaly detection, and trend analysis",
      icon: TrendingUp,
      features: ["Time Series Forecasting", "Anomaly Detection", "Pattern Recognition", "Real-time Scoring"]
    },
    {
      name: "Data Integration Hub",
      description: "Connect any data source with pre-built connectors and transformations",
      icon: Database,
      features: ["500+ Connectors", "Real-time Sync", "Data Transformation", "Schema Mapping"]
    },
    {
      name: "Smart Scheduler",
      description: "AI-optimized scheduling and resource allocation for maximum efficiency",
      icon: Calendar,
      features: ["Constraint Optimization", "Resource Balancing", "Conflict Resolution", "Dynamic Rescheduling"]
    }
  ];

  const testimonials = [
    {
      quote: "Horizon Labs reduced our processing time by 90% and saved us over $500k annually. The clean interface and minimal setup were perfect.",
      author: "Sarah Chen",
      title: "CTO, TechFlow Corp",
      rating: 5
    },
    {
      quote: "The AI components are incredibly powerful yet easy to implement. Our team was up and running in days.",
      author: "Mike Rodriguez",
      title: "Operations Director, RetailMax",
      rating: 5
    },
    {
      quote: "Best automation platform we've used. The customer support is outstanding and the results speak for themselves.",
      author: "Lisa Wang",
      title: "CFO, FinanceFlow",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <MouseTracker />
      <FloatingActionButton />
      <ScrollToTop />
      <FloatingElements />
      
      <NotificationManager notifications={notifications} onRemove={removeNotification} />
      
      {/* Hero Section with Background Image */}
      <section className="relative z-10 hero-background">
        <div className="hero-overlay">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Badge variant="secondary" className="mb-6 border border-primary/20 bg-primary/10 text-primary backdrop-blur-sm">
                  AI Automation Agency
                </Badge>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              >
                <TypewriterText 
                  text="Automate Everything."
                  className="block mb-4"
                />
                <motion.span 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  Scale Infinitely.
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl backdrop-blur-sm bg-background/30 p-4 rounded-lg"
              >
                Clean, minimalist AI automation solutions designed for modern businesses. 
                Transform your operations with precision-engineered workflows that scale effortlessly.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <MagneticButton className="glow">
                  <ContactFormModal addNotification={addNotification} />
                </MagneticButton>
                <MagneticButton>
                  <DemoModal addNotification={addNotification} />
                </MagneticButton>
                <VideoModal />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 backdrop-blur-sm bg-background/20 p-6 rounded-xl"
              >
                <div className="flex flex-col items-center">
                  <AnimatedCounter end={90} suffix="%" />
                  <div className="text-sm text-muted-foreground">Cost Reduction</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="mb-2 text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Automated Operations</div>
                </div>
                <div className="flex flex-col items-center">
                  <AnimatedCounter end={10} suffix="x" />
                  <div className="text-sm text-muted-foreground">Faster Processing</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-xl font-mono font-bold tracking-wider">HORIZON LABS</span>
          </motion.div>
          <div className="flex items-center gap-4">
            <motion.a 
              href="#case-studies" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              Case Studies
            </motion.a>
            <motion.a 
              href="#components" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              Components
            </motion.a>
            <motion.a 
              href="#testimonials" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              Testimonials
            </motion.a>
            <ContactFormModal addNotification={addNotification} />
          </div>
        </div>
      </motion.nav>

      {/* Case Studies Section */}
      <section id="case-studies" className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Real Results from Real Companies
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              See how leading enterprises transformed their operations with our AI automation platform
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{study.company}</CardTitle>
                        <CardDescription>{study.industry}</CardDescription>
                      </div>
                      <Badge variant="outline">{study.industry}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-semibold text-sm">Challenge</h4>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="mb-2 font-semibold text-sm">Solution</h4>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <motion.div 
                          className="text-lg font-bold text-primary"
                          whileHover={{ scale: 1.1 }}
                        >
                          {study.results.timeReduction}
                        </motion.div>
                        <div className="text-xs text-muted-foreground">Time Saved</div>
                      </div>
                      <div className="text-center">
                        <motion.div 
                          className="text-lg font-bold text-primary"
                          whileHover={{ scale: 1.1 }}
                        >
                          {study.results.costSavings}
                        </motion.div>
                        <div className="text-xs text-muted-foreground">Annual Savings</div>
                      </div>
                      <div className="text-center">
                        <motion.div 
                          className="text-lg font-bold text-primary"
                          whileHover={{ scale: 1.1 }}
                        >
                          {study.results.satisfaction}
                        </motion.div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4 border-t">
                      {study.metrics.map((metric, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center justify-between text-xs"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-muted-foreground">{metric.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-red-400">{metric.before}</span>
                            <ArrowRight className="h-3 w-3" />
                            <span className="font-medium text-primary">{metric.after}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Don't just take our word for it. Here's what our customers say about Horizon Labs.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <blockquote className="text-sm mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="text-sm">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Library Section */}
      <section id="components" className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Pre-built AI Components
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Drag-and-drop AI components that integrate seamlessly into your existing workflows. 
              No coding required, enterprise-ready from day one.
            </p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {components.map((component, index) => {
              const IconComponent = component.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="h-5 w-5" />
                        </motion.div>
                        <div>
                          <CardTitle className="text-lg">{component.name}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="mt-2">
                        {component.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {component.features.map((feature, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-center gap-2 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm" className="mt-4 w-full group-hover:border-primary/50">
                          <Code className="mr-2 h-4 w-4" />
                          View Component
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="mb-6 text-lg text-muted-foreground">
              Ready to transform your business operations?
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ContactFormModal />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <motion.div 
                className="mb-4 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <span className="text-xl font-mono font-bold tracking-wider">HORIZON LABS</span>
              </motion.div>
              <p className="text-sm text-muted-foreground">
                Clean, minimalist AI automation solutions that scale with your business.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Features</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Pricing</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Security</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>API Docs</motion.a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>About</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Careers</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Contact</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Blog</motion.a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Help Center</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Community</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Status</motion.a></li>
                <li><motion.a href="#" className="hover:text-foreground transition-colors" whileHover={{ x: 5 }}>Privacy</motion.a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Horizon Labs. All rights reserved. Built for enterprise scale.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}