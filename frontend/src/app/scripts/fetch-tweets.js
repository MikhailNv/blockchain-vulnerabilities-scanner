import { useWorkspace } from './useWorkspace'
import { Tweet } from '../models/Tweet'
import bs58 from 'bs58'

export const fetchTweets = async (filters = []) => {
    const { program } = useWorkspace()
    const tweets = await program.account.tweet.all(filters);
    return tweets.map((tweet) => new Tweet(tweet.publicKey, tweet.account))
}

export const authorFilter = (authorBase58PublicKey) => ({
    memcmp: {
        offset: 8, // Длина дискриминатора
        bytes: authorBase58PublicKey,
    }
})

export const topicFilter = (topic) => ({
    memcmp: {
        offset: 8 + // Длина дискриминатора
            32 + // Длина публичного ключа автора
            8 + // Длина временной метки
            4, // Префикс строки названия ПО
        bytes: bs58.encode(Buffer.from(topic)),
    }
})