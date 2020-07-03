// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as snippets from "./snippets/snippets.json";
import * as settings from "./settings.json"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// // Use the console to output diagnostic information (console.log) and errors (console.error)
	// // This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "helloworld" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello Doge!');
	// });

	// let secondDisposable = vscode.commands.registerCommand('helloworld.currentTime', () => {
	// 	vscode.window.showWarningMessage('Careful, the current time is ' + new Date());
	// });

	// context.subscriptions.push(disposable);
	const provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			// a completion item that inserts its text as snippet,
			// the `insertText`-property is a `SnippetString` which will be
			// honored by the editor.
			const useState = new vscode.CompletionItem(snippets.useState.prefix, 14);
			if(settings.useSemicolons){
				useState.insertText = new vscode.SnippetString(snippets.useState.body[0]);
			}
			else{
				useState.insertText = new vscode.SnippetString("const [${1}, set${1/(.*)/${1:/capitalize}/}] = useState($2)$0");
			}
			useState.documentation = new vscode.MarkdownString(snippets.useState.description);


			// return all completion items as array
			return [
				useState
			];
		}
	});

	context.subscriptions.push(provider1);
}

// this method is called when your extension is deactivated
export function deactivate() {}
