import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='min-h-screen bg-background flex items-center justify-center px-6'>
            <div className='max-w-md w-full text-center'>
                <h2 className='text-5xl font-roboto-condensed text-primary font-bold mb-2'>404</h2>
                <p className='mb-8'>Could not find requested page</p>
                <Link href="/" className='btn-primary '>Go Home</Link>
            </div>
        </div>
    )
}