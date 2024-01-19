import React from 'react'
import {FC} from 'react'
import { useWorkspace } from '../scripts/useWorkspace'
import { fetchTweets, authorFilter } from '../scripts/fetch-tweets'

const Profile: FC = () => {
    const { wallet } = useWorkspace()
    const fetchCountUserTweets = async () => {
        const fetchedTweets = await fetchTweets([authorFilter(wallet.publicKey.toBase58())])
        return fetchedTweets.length
    }

    return (
        <>
            <div className="min-w-screen max-h-screen bg-white-200 flex items-center justify-center px-5 py-5">
                <div className="rounded-lg shadow-xl bg-gray-900 text-white">
                    <div className="border-b border-gray-800 px-8 py-3">
                        <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div><div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div><div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="px-8 py-6">
                        <p><em className="text-blue-400">const</em> <span className="text-green-400">aboutMe</span> <span className="text-pink-500">=</span> <em className="text-blue-400">function</em>{`() {`}</p>
                        <p>&nbsp;&nbsp;<span className="text-pink-500">return</span> {`{`}</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;имя: <span className="text-yellow-300">{ wallet.publicKey.toBase58() }</span>,</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;записи: <span className="text-yellow-300">{ fetchCountUserTweets() }</span>,</p>
                        <p>&nbsp;&nbsp;{`}`}</p>
                        <p>{`}`}</p>
                    </div>
                </div>
            </div>
            {/* <div v-if="true" className="border-b px-8 py-4 bg-gray-50">
                { wallet.publicKey.toBase58() }
            </div> */}
        </>
    )
}

export default Profile