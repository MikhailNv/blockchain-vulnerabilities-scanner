import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js'
import { AnchorProvider, Program, setProvider } from '@project-serum/anchor'
import idl from '../../../../target/idl/solana_scanner.json'
import { Idl } from '@coral-xyz/anchor';

const preflightCommitment = 'processed'
const commitment = 'processed'
const programID: PublicKey = new PublicKey(idl.metadata.address)
let workspace: any = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    const wallet = useAnchorWallet()
    const connection: Connection = new Connection('http://127.0.0.1:8899', commitment)
    const provider: AnchorProvider = new AnchorProvider(connection, wallet!, { preflightCommitment, commitment });
    const program: Program = new Program(idl as Idl, programID, provider);

    console.log("init workspace")

    workspace = {
        wallet,
        connection,
        provider,
        program,
    }
}