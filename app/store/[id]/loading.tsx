import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ProductLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Skeleton className="aspect-square rounded-lg" />

            <div className="flex flex-col">
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-8 w-1/4 mb-4" />
              <Skeleton className="h-20 w-full mb-6" />

              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-24 mb-2" />
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-6 w-8 mx-4" />
                    <Skeleton className="h-10 w-10" />
                  </div>
                </div>

                <Skeleton className="h-12 w-full md:w-40" />

                <div className="border-t pt-6 mt-6">
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="overflow-hidden rounded-lg border">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
