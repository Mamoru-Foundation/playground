import {EvmCtx} from "@mamoru-ai/mamoru-evm-sdk-as/assembly"
import {IncidentSeverity, parameter, report} from "@mamoru-ai/mamoru-sdk-as/assembly"

export function main(): void {
    const ctx = EvmCtx.load();
    const contractAddress = parameter("contractAddress").asString().toLowerCase()
    const contractOwner = parameter("contractOwner").asString().toLowerCase()

    for (let i = 0; i < ctx.callTraces.length; i++) {
        const trace = ctx.callTraces[i];
        const tx = ctx.txs[trace.txIndex]
        if (trace.to.toLowerCase() != contractAddress) {
            continue;
        }

        const senderAddress = tx.from;
        // Search for increaseCounter and decreaseCounter functions
        const methodIncrease = trace.input.parse("increaseCounter(uint256 amount)")
        const methodDecrease = trace.input.parse("decreaseCounter(uint256 amount)")
        // Check if the function is called
        if (methodIncrease != null || methodDecrease != null) {
            // Check if the function is called by the not owner
            if (senderAddress != contractOwner) {
                return report(tx.txHash, IncidentSeverity.Alert, `Unexpected: the function is not called by the owner`, null, senderAddress);
            }

            return report(tx.txHash, IncidentSeverity.Info, `Expected: the function is called by the owner`, null, senderAddress);
        }
    }
}
