"use client"

import { useEffect, useState } from 'react';
import {FC, useMemo} from 'react'
import { initWorkspace, useWorkspace } from './scripts/useWorkspace'
import { fetchTweets } from './scripts/fetch-tweets'
import { Tweet } from './models/Tweet'
import React from 'react';

// const tweets = useRef([])
// const loading = useRef(true)

const Home: FC = () => {
  console.log("IN HOME")
  initWorkspace();
  console.log(useWorkspace())
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTweets()
    .then((fetchedTweets) => setTweets(fetchedTweets))
    .finally(() => setLoading(false))
  }, [])

  return (
    <>
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

export default Home
