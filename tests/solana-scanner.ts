import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaScanner } from "../target/types/solana_scanner";
import * as assert from "assert";
import * as bs58 from "bs58";

describe("solana-scanner", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaScanner as Program<SolanaScanner>;

  it('проверка создания новой записи с корректными данными от текущего адреса кошелька', async () => {
    // Before sending the transaction to the blockchain.
    const tweet = anchor.web3.Keypair.generate();
    // const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    console.log(anchor.web3.SystemProgram.programId)
    await program.rpc.sendTweet('Alt Linux', 'QmVKkJiojwUdywtawEoQA7fhc8SRwJPMAkNj9TfjLCXLiV', {
        accounts: {
            // Accounts here...
            tweet: tweet.publicKey,
            author: program.provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [tweet],
    });

    // After sending the transaction to the blockchain.
    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data.
    assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, 'Alt Linux');
    assert.equal(tweetAccount.content, 'QmVKkJiojwUdywtawEoQA7fhc8SRwJPMAkNj9TfjLCXLiV');
    assert.ok(tweetAccount.timestamp);
  });

  it('проверка создания новой записи без указания названия программного обеспечения', async () => {
    // Call the "SendTweet" instruction.
    const tweet = anchor.web3.Keypair.generate();
    await program.rpc.sendTweet('', 'QmVKkJiojwUdywtawEoQA7fhc8SRwJPMAkNj9TfjLCXLiV', {
        accounts: {
            tweet: tweet.publicKey,
            author: program.provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [tweet],
    });

    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data.
    assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, '');
    assert.equal(tweetAccount.content, 'QmVKkJiojwUdywtawEoQA7fhc8SRwJPMAkNj9TfjLCXLiV');
    assert.ok(tweetAccount.timestamp);
  });

  it('проверка создания новой записи с корректными данными от публичного адреса другого автора', async () => {
    // Генерация нового автора и пополнение его баланса SOL для оплаты транзакции.
    const otherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
    await program.provider.connection.confirmTransaction(signature);

    // Вызов "SendTweet" инструкции от созданного пользователя.
    const tweet = anchor.web3.Keypair.generate();
    await program.rpc.sendTweet('Astra Linux', 'QmVKkJiojwUdywtawEoQA7fhc8SRwJPMAkNj9TfjLCXLiV', {
        accounts: {
            tweet: tweet.publicKey,
            author: otherUser.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [otherUser, tweet],
    });

    // Запрос на получение данных об учетной записи
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // Проверка корректности записанных данных
    assert.equal(tweetAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(tweetAccount.topic, 'Astra Linux');
    assert.equal(tweetAccount.content, 'QmVKkJiojwUdywtawEoQA7fhc8SRwJPMAkNj9TfjLCXLiV');
    assert.ok(tweetAccount.timestamp);
  });

  it('проверка получения всех ранее созданных записей из блокчейна', async () => {
    const tweetAccounts = await program.account.tweet.all();
    assert.equal(tweetAccounts.length, 3);
  });

  it('проверка получения всех ранее созданных записей указанным автором', async () => {
    const authorPublicKey = program.provider.wallet.publicKey
    const tweetAccounts = await program.account.tweet.all([
        {
            memcmp: {
                offset: 8, // Discriminator.
                bytes: authorPublicKey.toBase58(),
            }
        }
    ]);

    assert.equal(tweetAccounts.length, 2);
    assert.ok(tweetAccounts.every(tweetAccount => {
      return tweetAccount.account.author.toBase58() === authorPublicKey.toBase58()
    }))
  });

  it('проверка получения всех ранее созданных записей с указанным названием программного обеспечения', async () => {
    const tweetAccounts = await program.account.tweet.all([
        {
            memcmp: {
                offset: 8 + // Discriminator.
                    32 + // Author public key.
                    8 + // Timestamp.
                    4, // Topic string prefix.
                bytes: bs58.encode(Buffer.from('Alt Linux')),
            }
        }
    ]);

    assert.equal(tweetAccounts.length, 1);
    assert.ok(tweetAccounts.every(tweetAccount => {
        return tweetAccount.account.topic === 'Alt Linux'
    }))
  });
});
