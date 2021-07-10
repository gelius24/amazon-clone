import Header from '../components/Header'
import {CheckCircleIcon} from '@heroicons/react/solid'
import { useRouter } from 'next/router'

function Success() {
    const router = useRouter()
    return (
        <div className='bg-gray-100 h-screen'>
            <Header />
            <main className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col p-10 bg-white'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-10' />
                        <h1 className='text-3xl'>Merci ! Votre achat a été confirmé !</h1>
                    </div>
                    <p>
                        Merci d'avoir acheter chez amazon.com. Vous receverez une confirmation de votre commande par mail bientôt. Pour voir le status de votre commande, cliquez sur le lien suivant.
                    </p>
                    <button onClick={() => router.push('/orders')} className="button mt-8">Voir ma commande</button>
                </div>
            </main>
        </div>
    )
}

export default Success
