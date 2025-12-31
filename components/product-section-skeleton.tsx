import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <div className="group block h-full py-1 min-w-[155px] md:min-w-auto">
    <Card className="text-card-foreground flex flex-col gap-2 sm:gap-4 rounded-xl border py-0 h-full overflow-hidden border-none bg-background shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card">
      <div className="aspect-square rounded-xl bg-muted animate-pulse" />

      <CardContent className="pt-2 space-y-2">
        <div className="flex justify-between">
          <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          <div className="h-3 w-10 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
        <div className="h-5 w-24 bg-muted rounded animate-pulse" />
      </CardContent>

      <CardFooter>
        <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
      </CardFooter>
    </Card>
    </div>
  )
}
