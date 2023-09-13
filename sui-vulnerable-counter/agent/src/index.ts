import {SuiCtx} from "@mamoru-ai/mamoru-sui-sdk-as/assembly"
import {IncidentSeverity, report, parameter} from "@mamoru-ai/mamoru-sdk-as/assembly"

export function main(): void {
    const ctx = SuiCtx.load();
    const txModule = parameter("txModule").asString()
    const senderAddress = ctx.tx.sender;

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
