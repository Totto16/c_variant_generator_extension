import { workspace, ExtensionContext, commands } from "vscode"

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind,
} from "vscode-languageclient/node"

class CVAClient {
	client: LanguageClient | null = null

	constructor() {
		this.setup(false)
	}

	setup(isRestart: boolean): void {
		//const config = workspace.getConfiguration("cva-language")
		//TODO: check the compiler version and capabilities, check if it's the CVA compiler !
		/* const serverOptions: ServerOptions = {
			run: {
				command: compilerPath,
				transport: TransportKind.stdio,
				args: ["--lsp"],
			},
			debug: {
				command: compilerPath,
				transport: TransportKind.stdio,
				args: ["--lsp", "--debug"],
			},
		}

		const clientOptions: LanguageClientOptions = {
			documentSelector: ["cva", { scheme: "file", language: "cva" }],
		}

		// Create the language client and start the client.
		this.client = new LanguageClient(
			"cva_language_Server",
			"Language Server For CVA",
			serverOptions,
			clientOptions,
		) */
	}

	async start(): Promise<void> {
		if (this.client === null) {
			return
		}
		// Start the client. This will also launch the server
		await this.client.start()
	}

	async stop(): Promise<void> {
		if (this.client === null) {
			return undefined
		}

		await this.client.stop()
		this.client = null
	}

	async restart(): Promise<void> {
		await this.stop()
		this.setup(true)
		await this.start()
	}

	async dispose(): Promise<void> {
		await this.stop()
	}
}

let client: CVAClient | null = null

export async function activate(context: ExtensionContext): Promise<void> {
	client = new CVAClient()
	await client.start()
}

export async function deactivate(): Promise<void> {
	await client?.stop()
}
