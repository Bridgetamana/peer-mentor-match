import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='min-h-screen bg-background flex items-center justify-center px-6'>
            <div className='max-w-lg w-full text-center'>
                <div className="mb-8">
                    <div className="box-shadow bg-primary p-8 inline-block mb-4">
                        <h1 className='text-6xl font-bold text-background'>404</h1>
                    </div>
                </div>
                <p className='text-muted text-lg mb-8 max-w-md mx-auto'>
                    Oops! The page you&apos;re looking for seems to have wandered off.
                </p>
                <div className="flex justify-center gap-4 mb-8">
                    <div className="w-8 h-8 bg-accent border-2 border-foreground"></div>
                    <div className="w-8 h-8 bg-primary border-2 border-foreground"></div>
                    <div className="w-8 h-8 bg-success border-2 border-foreground"></div>
                </div>
                <Link href="/" className='btn-primary !text-xl !py-4 !font-bold inline-block'>
                    Go Back
                </Link>
            </div>
        </div>
    )
}