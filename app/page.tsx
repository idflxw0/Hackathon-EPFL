import ReviewWizard from "@/components/review-wizard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <ReviewWizard />
      </div>
    </main>
  )
}

