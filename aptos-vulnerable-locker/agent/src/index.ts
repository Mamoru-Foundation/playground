import {AptosCtx, CallTrace} from "@mamoru-ai/mamoru-aptos-sdk-as/assembly"
import {IncidentSeverity, parameter, report} from "@mamoru-ai/mamoru-sdk-as/assembly"

export function main(): void {
    const ctx = AptosCtx.load();
    const txModule = parameter("txModule").asString();
    const blockTimeSecs = Math.floor(ctx.block.timestampUsecs as number / 1_000_000) as u64;

    for (let i = 0; i < ctx.callTraces.length; i++) {
        const callTrace = ctx.callTraces[i];

        if (callTrace.transactionModule != txModule || callTrace.func != "claim") {
            continue;
        }

        const nextTimeToClaimCall = findNextTimeToClaimCall(callTrace, ctx.callTraces);

        if (nextTimeToClaimCall == null) {
            continue;
        }

        const unlockTimeSecs = nextTimeToClaimCall.args[1].asU64();

        if (blockTimeSecs < unlockTimeSecs) {
            const tx = ctx.txs[callTrace.txSeq as i32];

            report(tx.hash, IncidentSeverity.Alert, "Tokens claimed before unlock time", null, tx.sender);
        }
    }
}

function findNextTimeToClaimCall(claimTrace: CallTrace, allTraces: CallTrace[]): CallTrace | null {
    for (let i = 0; i < allTraces.length; i++) {
        const trace = allTraces[i];

        if (trace.seq <= claimTrace.seq) {
            continue;
        }

        const txModuleMatches = trace.transactionModule == claimTrace.transactionModule;
        const funcMatches = trace.func == "is_time_to_claim";
        const depthMatches = trace.depth == (claimTrace.depth + 1);

        if (txModuleMatches && funcMatches && depthMatches) {
            return trace;
        }
    }

    return null;
}
