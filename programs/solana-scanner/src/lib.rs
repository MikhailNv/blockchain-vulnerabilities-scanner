use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("FqjacZXxfP69iy39YEHxTYn9hCYZ35c3STJqXgGnVFLH");

// Описание логики инструкции SendTweet
#[program]
pub mod solana_scanner {
    use super::*;

    pub fn send_tweet(ctx: Context<SendTweet>, topic: String, content: String) -> Result<()> {
        let tweet: &mut Account<Tweet> = &mut ctx.accounts.tweet; // Получение доступа к учетной записи Tweet
        let author: &Signer = &ctx.accounts.author; // Получение доступа к учетной записи Author
        let clock: Clock = Clock::get().unwrap(); // Получение текущей временной метки
        
        // Проверка корректности полученных данных для заголовка программного обеспечения
        if topic.chars().count() > (20 * 4) {
            return Err(error!(ErrorCode::TopicTooLong))
        }
        
        // Проверка корректности полученных данных об уязвимостях программного обеспечения
        if content.chars().count() > (46 * 4) {
            return Err(error!(ErrorCode::ContentTooLong))
        }
        
        // Сохранение полученных значений
        tweet.author = *author.key;
        tweet.timestamp = clock.unix_timestamp;
        tweet.topic = topic;
        tweet.content = content;

        Ok(())
    }
}

// Определение структуры SendTweet инструкции
#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>, // Добавление учетной записи Tweet
    #[account(mut)]
    pub author: Signer<'info>, // Добавление учетной записи автора
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>, // Добавление системной учетной записи
}

// 1. Определение структуры Tweet учетной записи, сохраняющей информацию о просканированном ПО
#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

// 2. Добавление констант для определения константных значений различных свойств.
const DISCRIMINATOR_LENGTH: usize = 8; // Зарезервированное пространство, где хранится тип учетной записи
const PUBLIC_KEY_LENGTH: usize = 32; // Длина публичного ключа автора
const TIMESTAMP_LENGTH: usize = 8; // Временная метка создания учетной записи
const STRING_LENGTH_PREFIX: usize = 4; // Префикс для строки свойства topic
const MAX_TOPIC_LENGTH: usize = 20 * 4; // Максимальная длина свойства topic
const CVE_DATA_HASH_LENGTH: usize = 46 * 4; // Длина hash-значения данных об уязвимостях

// 3. Определение конечного размера одной учетной записи Tweet.
impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Автор
        + TIMESTAMP_LENGTH // Временная метка
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Заголовок
        + STRING_LENGTH_PREFIX + CVE_DATA_HASH_LENGTH; // Основное содержание
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
