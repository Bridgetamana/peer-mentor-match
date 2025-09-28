export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="text-center">
                <div className="section-title mb-4 mx-auto animate-bounce">
                    Loading...
                </div>
                <div className="flex justify-center gap-2">
                    <div className="w-3 h-3 bg-primary border-2 border-foreground animate-pulse"></div>
                    <div className="w-3 h-3 bg-primary border-2 border-foreground animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-primary border-2 border-foreground animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
}