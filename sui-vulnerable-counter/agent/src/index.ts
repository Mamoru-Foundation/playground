import {SuiCtx} from "@mamoru-ai/mamoru-sui-sdk-as/assembly"
import {IncidentSeverity, parameter, report} from "@mamoru-ai/mamoru-sdk-as/assembly"

// Mamoru's multisig address
const MAMORU_SENDER = "0x157f71f73044ab98b5962b9714bc8df7587a6d6e08afb2e4a6e52706b0932d16";

export function main(): void {
    const ctx = SuiCtx.load();
    const txModule = parameter("txModule").asString()
    const senderAddress = ctx.tx.sender;

    // Circuit breaker, don't react to Mamoru's own transactions
    if (senderAddress == MAMORU_SENDER) {
        return;
    }

    for (let i = 0; i < ctx.callTraces.length; i++) {
        const trace = ctx.callTraces[i];

        if (trace.transactionModule != txModule || trace.func != "set_value") {
            continue;
        }

        const counter = trace.args[0].asStruct();
        const ownerAddress = counter.fields.get("owner").asString();

        if (ownerAddress != senderAddress) {
            return report(ctx.tx.digest, IncidentSeverity.Alert, `Unexpected "set_value" access`, null, senderAddress);
        }

        return report(ctx.tx.digest, IncidentSeverity.Info, `Admin accessed "set_value" function`, null, senderAddress);
    }
}
