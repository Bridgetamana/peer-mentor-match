import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='min-h-screen bg-background flex items-center justify-center px-6'>
            <div className='max-w-lg w-full text-center'>
                <h1 className='text-6xl font-bold text-primary mb-1 text-shadow-2xs text-shadow-black'>404</h1>
                <p className='text-muted text-lg mb-6 max-w-md mx-auto'>
                    Oops! The page you&apos;re looking for seems to have wandered off.
                </p>
                <Link href="/" className='btn-primary'>
                    Go Back
                </Link>
            </div>
        </div>
    )
}