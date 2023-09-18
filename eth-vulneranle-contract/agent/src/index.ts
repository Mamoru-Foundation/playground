import {EvmCtx} from "@mamoru-ai/mamoru-evm-sdk-as/assembly"
import {IncidentSeverity, parameter, report} from "@mamoru-ai/mamoru-sdk-as/assembly"

export function main(): void {
    const ctx = EvmCtx.load();
    const contractAddress = parameter("contractAddress").asString()
    const contractOwner = parameter("contractOwner").asString()

    for (let i = 0; i < ctx.txs.length; i++) {
        const tx = ctx.txs[i];

        if (tx.to != contractAddress) {
            continue;
        }

        const senderAddress = tx.from;
        if (contractOwner != senderAddress) {
            return report(tx.txHash, IncidentSeverity.Alert, `Unexpected: The owner of the contract is not call contract functions`, null, senderAddress);
        }

        return report(tx.txHash, IncidentSeverity.Info, `Expected: The owner of the contract is call contract functions`, null, senderAddress);
    }
}
