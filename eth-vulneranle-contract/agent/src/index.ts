import {EvmCtx} from "@mamoru-ai/mamoru-evm-sdk-as/assembly"
import {IncidentSeverity, parameter, report} from "@mamoru-ai/mamoru-sdk-as/assembly"
import {bytesToHex} from "@mamoru-ai/mamoru-sdk-as/assembly/util"

export function main(): void {
    const ctx = EvmCtx.load();
    const contractAddress = parameter("contractAddress").asString()
    const contractOwner = parameter("contractOwner").asString()
    const methodCounterDecreased = parameter("methodCounterDecreased").asString()
    const methodCounterIncreased = parameter("methodCounterIncreased").asString()

    for (let i = 0; i < ctx.events.length; i++) {
        const event = ctx.events[i];

        if (event.address != contractAddress) {
            continue;
        }

        const tx = ctx.txs[event.txIndex]
        const senderAddress = tx.from;
        if (bytesToHex(event.topic0) == methodCounterDecreased || bytesToHex(event.topic0) == methodCounterIncreased) {
            if (senderAddress != contractOwner) {
                return report(tx.txHash, IncidentSeverity.Alert, `Unexpected: the function is not called by the owner`, null, senderAddress);
            }
        }

        return report(tx.txHash, IncidentSeverity.Info, `Expected: the function is called by the owner`, null, senderAddress);
    }
}
