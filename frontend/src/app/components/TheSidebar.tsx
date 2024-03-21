import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FC } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';

import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const TheSidebar: FC = () => {
    const { connected } = useWallet();
    const currentRoute = usePathname();
    return (
    <div className="py-4 md:py-8 md:pl-4 md:pr-8 fixed w-20 md:w-64">
        <aside className="flex flex-col items-center md:items-stretch space-y-2 md:space-y-4">
            <Link href="/" className="inline-block rounded-full hover:bg-gray-100 p-3 md:self-start">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-8 md:h-10 w-8 md:w-10 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg> */}
                <svg viewBox="0 0 24 24" id="Artwork" xmlns="http://www.w3.org/2000/svg" fill="#4285f4" className="h-8 md:h-10 w-8 md:w-10 text-pink-500"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14.86,11.62h2v.06c0,5.91-3.44,8-4.58,8.54v1.53l.25-.08c.23-.08,5.77-2.08,5.77-10V10.2H14.13Z"></path><path d="M14.13,10.2l.7-1.27V2.25l-1.12.87c-2.44,1.79-5,5.08-4.84,8.94a8,8,0,0,0,3.4,6.39l.1.07.75-1.22-.1-.06a6.24,6.24,0,0,1-.82-.71L14.86,15V11.62Zm-.7,1.42v2.56L11.3,15.41a6.49,6.49,0,0,1-1-3.42c-.13-3.33,2.13-5.85,3.11-6.78V8.53l-1.68,3.09h1.72"></path><path d="M12.24,20.22a9.28,9.28,0,0,1-5.06-8.76V10.15H5.75v1.31c0,7.52,5.6,10,6.24,10.2l.24.09"></path></g></svg>
            </Link>
            <div className="flex flex-col items-center md:items-stretch space-y-2">
                <Link href="/" className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4">
                    {currentRoute === '/' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    )}
                    <div className="text-lg hidden md:block">Главная</div>
                </Link>
                <Link href="/topics" className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4">
                    {currentRoute === '/topics' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                    )}
                    <div className="text-lg hidden md:block">Поиск записей</div>
                </Link>
                <Link href="/users" className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4">
                    {currentRoute === '/users' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    )}
                    <div className="text-lg hidden md:block">Пользователи</div>
                </Link>
                { connected ? 
                    <Link href="/profile" className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4">
                        {currentRoute === '/profile' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )}
                        <div className="text-lg hidden md:block">Профиль</div>
                    </Link> : <></>
                }
                { connected ? 
                    <Link href="/file_upload" className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4">
                        {/* {currentRoute === '/file_upload' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )} */}
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="red" className={`${currentRoute === '/file_upload' ? "animate-spin": ""} h-10 w-10 text-gray-700`}><g id="SVGRepo_bgCarrier" strokeWidth="2"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#374151" d="M252.78 20.875c-1.302.012-2.6.03-3.905.063-37.928.974-76.148 11.153-111.28 31.437C25.164 117.285-13.41 261.322 51.5 373.75s208.946 151.036 321.375 86.125c77.7-44.86 120.1-127.513 117.47-211.406-3.563 65.847-35.898 128.573-91 169.374-10.828 9.62-22.774 18.315-35.814 25.844-103.68 59.86-235.983 24.4-295.842-79.282-59.86-103.68-24.43-235.984 79.25-295.844 35.64-20.576 74.67-29.88 112.968-29.03 63.304 1.4 124.623 30.57 165.438 82.53l-32.594 23.032c-33.27-42.835-84.01-66.6-136.063-67-.96-.008-1.91-.012-2.875 0-.964.01-1.943.038-2.906.062-28.006.717-56.222 8.215-82.156 23.188-82.99 47.914-111.508 154.322-63.594 237.312 47.914 82.99 154.32 111.51 237.313 63.594 51.37-29.66 81.862-81.724 86.28-136.78-12.53 45.37-42.32 86.745-85.438 114.186-.02.013-.043.018-.062.03l-.344.22c-3.16 2.147-6.42 4.216-9.78 6.156-74.245 42.865-168.918 17.494-211.782-56.75-42.864-74.243-17.493-168.917 56.75-211.78 23.2-13.396 48.39-20.122 73.375-20.782 47.953-1.266 95.138 19.858 125.968 59.156l-39.844 28.156c-20.232-24.32-50.055-37.79-80.594-38.03-1.17-.01-2.33 0-3.5.03-17.035.432-34.176 4.995-49.938 14.094-50.435 29.12-67.806 93.877-38.687 144.313 29.12 50.434 93.908 67.806 144.344 38.686 21.245-12.267 36.623-30.85 45.124-52.03-18.815 21.064-44.364 36.888-73.938 44.155-.04.013-.084.02-.125.033-37.507 10.787-78.796-4.816-99.217-40.188-24.07-41.688-9.845-94.712 31.843-118.78 13.028-7.523 27.143-11.314 41.156-11.69 25.66-.685 50.898 10.098 68.188 30.25l-41 28.97c-5.497-4.796-12.664-7.72-20.53-7.72-17.277 0-31.283 14.007-31.283 31.282 0 17.276 14.004 31.282 31.282 31.282 17.277 0 31.28-14.007 31.28-31.283 0-1.187-.06-2.347-.188-3.5l120.094-57.312 4.03-1.75-.06-.156 62.25-29.72 9.25-4.438-5.282-8.812-19.97-33.375-5.155-8.625-8.25 5.813-8.095 5.718c-45.9-58.864-116.14-91.053-187.844-90.405z"></path></g></svg>
                        <div className="text-lg hidden md:block">Сканирование</div>
                    </Link> : <></>
                }
            </div>
            {/* <div className="fixed bottom-8 right-8 md:static w-48 md:w-full">
                <WalletMultiButtonDynamic />
            </div> */}
            { connected ? 
                <WalletMultiButtonDynamic className="rounded-full hover:bg-gray-100"/>
            : <WalletMultiButtonDynamic className="rounded-full hover:bg-gray-100">Выберите кошелек</WalletMultiButtonDynamic>
            }
        </aside>
    </div>
    )
}
  
export default TheSidebar