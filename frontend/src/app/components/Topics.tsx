import React from 'react'
import {FC, useState} from 'react'
import { Tweet } from '../models/Tweet'
import { fetchTweets, topicFilter } from '../scripts/fetch-tweets'

const Topics: FC = () => {
    const [topic, setTopic] = useState('')
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const fetchTopicTweets = async () => {
        const fetchedTweets = await fetchTweets([topicFilter(topic)])
        setTweets(fetchedTweets)
    }

    return (
        <>
            <div className="relative border-b">
                <input type="text" className="text-gray-700 w-full pl-16 pr-32 py-4 bg-gray-50" onChange={e => setTopic(e.target.value)}/>
                <div className="absolute left-0 inset-y-0 flex text-gray-400 items-center justify-center pl-8 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
                    </svg> 
                </div>
                <div className="absolute right-0 inset-y-0 flex items-center pr-8">
                    <button
                        className="rounded-full px-4 py-1  font-semibold text-gray-700 bg-gray-300 hover:bg-gray-400 hover:text-white"
                        onClick={fetchTopicTweets}
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

export default Topics