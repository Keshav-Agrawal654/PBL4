import { useLocation } from "wouter";
import { useGetReport } from "@/hooks/use-report";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, RefreshCcw, ArrowRight, Lightbulb, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Report() {
  const searchParams = new URLSearchParams(window.location.search);
  const quizId = parseInt(searchParams.get("quiz_id") || "0");
  const [, setLocation] = useLocation();

  const { data: report, isLoading, error } = useGetReport(quizId);

  if (!quizId) {
    return (
      <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-xl font-semibold mb-4">No Quiz Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find the quiz results. Please take the quiz first.
              </p>
              <Button asChild>
                <a href="/quiz">Take Quiz</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8 md:p-12">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          <Card className="border-none shadow-xl">
            <CardContent className="p-8 md:p-12">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-xl border-l-4 border-l-red-500">
            <CardContent className="p-12 text-center">
              <h2 className="text-xl font-semibold mb-4 text-red-600">
                Error Generating Report
              </h2>
              <p className="text-muted-foreground mb-6">
                We encountered an error while generating your report. Please try again.
              </p>
              <Button onClick={() => window.location.reload()}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-display mb-2">Your Wellness Report</h1>
            <p className="text-muted-foreground">
              Personalized insights based on your assessment
            </p>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Your Assessment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {report.summary}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report.recommendations.map((rec, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <span className="text-foreground pt-0.5">{rec}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resources */}
        {report.resources && report.resources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Recommended Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {report.resources.map((resource, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <span className="inline-block mt-3 text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {resource.type}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 pt-6 justify-center"
        >
          <Button asChild variant="outline" className="rounded-full px-8">
            <a href="/tips">
              Explore Wellness Tips <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild className="rounded-full px-8">
            <a href="/quiz">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </a>
          </Button>
        </motion.div>

        {/* Help Section */}
        <Card className="border-none shadow-xl bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">Need Support?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you're struggling with your mental health, please reach out to a mental health professional or contact our support team.
            </p>
            <Button asChild variant="outline" size="sm">
              <a href="/contact">Get Professional Help</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
