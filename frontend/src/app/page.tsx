"use client"

import { useEffect, useState } from 'react';
import {FC, useMemo} from 'react'
import { CSSTransition } from 'react-transition-group';
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
  const [copyState, setCopyState] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true);

  const copy_author_address = (author: string) => {
    navigator.clipboard.writeText(author)
    // setCopyState(true)
    // setCopyState(false)
  }

  useEffect(() => {
    fetchTweets()
    .then((fetchedTweets) => setTweets(fetchedTweets))
    .finally(() => setLoading(false))
  }, [])

  return (
    <>
      { tweets.map((tweet, index) =>
        <div key={index} className="px-8 py-4">
          <div className="flex items-center">
            <input type="hidden" id="hs-clipboard-tooltip-on-hover" value="npm install preline"/>
            <button type="button" onClick={() => copy_author_address(tweet.author_display)} className="js-clipboard [--is-toggle-tooltip:false] hs-tooltip relative py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              data-clipboard-target="#hs-clipboard-tooltip-on-hover"
              data-clipboard-action="copy"
              data-clipboard-success-text="Copied">
              <h3 className="w-24 text-ellipsis overflow-hidden inline-block font-semibold">
                { tweet.author_display }
              </h3>
              <span className="border-s ps-3.5">
                {/* {!copyState ? <svg className="js-clipboard-default w-4 h-4 group-hover:rotate-6 transition" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
                : <svg className="js-clipboard-success w-4 h-4 text-blue-600 rotate-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                } */}
                <svg className="js-clipboard-default w-4 h-4 group-hover:rotate-6 transition" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
              </span>
            </button>
            <span className="ml-2 text-gray-500">•</span>
            <time className="ml-2 text-gray-500 text-sm">
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
