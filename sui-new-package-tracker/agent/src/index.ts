import {SuiCtx} from "@mamoru-ai/mamoru-sui-sdk-as/assembly"
import {IncidentSeverity, parameter, report} from "@mamoru-ai/mamoru-sdk-as/assembly"

export function main(): void {
    const ctx = SuiCtx.load();
    const warnThreshold = parameter("warnThreshold").asNumber();

    for (let i = 0; i < ctx.programmableTransactionCommands.length; ++i) {
        const command = ctx.programmableTransactionCommands[i];

        if (command.isPublish) {
          const publishCommand = command.publishCommand!;
          const dependencies = publishCommand.dependencies.length;

            if (dependencies >= warnThreshold) {
                report(ctx.tx.digest, IncidentSeverity.Warning, `New package publish, dependencies: ${dependencies}`, null, ctx.tx.sender);
            } else {
                report(ctx.tx.digest, IncidentSeverity.Info, "New package publish", null, ctx.tx.sender);
            }
        }
    }
}
