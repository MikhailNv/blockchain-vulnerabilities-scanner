import React from 'react'
import {FC, useState} from 'react'
import { Tweet } from '../models/Tweet'
import { fetchTweets, authorFilter } from '../scripts/fetch-tweets'

const Users: FC = () => {
    const [author, setAuthor] = useState('')
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const fetchUserTweets = async () => {
        const fetchedTweets = await fetchTweets([authorFilter(author)])
        setTweets(fetchedTweets)
    }

    return (
        <>
            <div className="relative border-b">
                <input type="text" className="text-gray-700 w-full pl-16 pr-32 py-4 bg-gray-50" onChange={e => setAuthor(e.target.value)}/>
                <div className="absolute left-0 inset-y-0 flex text-gray-400 items-center justify-center pl-8 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                </div>
                <div className="absolute right-0 inset-y-0 flex items-center pr-8">
                    <button
                        className="rounded-full px-4 py-1  font-semibold text-gray-700 bg-gray-300 hover:bg-gray-400 hover:text-white"
                        onClick={fetchUserTweets}
                    >
                        Поиск
                    </button>
                </div>
            </div>
            { tweets.map((tweet, index) =>
                <div key={index} className="px-8 py-4">
                    <div>
                        <h3 className="inline font-semibold">
                        { tweet.author_display }
                        </h3>
                        <span className="text-gray-500"> • </span>
                        <time className="text-gray-500 text-sm">
                        { tweet.created_ago }
                        </time>
                    </div>
                    <p className="whitespace-pre-wrap">{ tweet.content }</p>
                    <p className="inline-block mt-2 text-blue-500 hover:underline">#{ tweet.topic }</p>
                </div>
            )}
        </>
    )
}

export default Users