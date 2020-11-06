// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function createFile(uri, file, data, ext = '.tsx') {
	vscode.workspace.fs.writeFile(vscode.Uri.parse(uri.path + '/' + file + ext), Buffer.from(data));
}


let templates = {
	component: (className) => `import React, {Component} from "react";

export class ${className} extends Component {
	render() {
		return <div>${className}</div>;
	}
}

export default ${className};
`,
	functionComponent: (functionName) => `import React, {FunctionComponent} from "react";

export const ${functionName}: FunctionComponent = (props) => {
	return <div>${functionName}</div>
};

export default ${functionName};
`,
	pageClass: (className) => `import { Component } from "react";

import ${className}View from "./${className}.view";

export class ${className} extends Component {
	render() {
		return ${className}View(this);
	}
}

export default ${className};
`,
	pageView: (className) => `import React from "react";
import ${className} from "./${className}";

export const ${className}View = (self: ${className}) => {
	return (<div>${className}</div>);
}

export default ${className}View;
`,
	pageFunction: (functionName) => `import { FunctionComponent } from "react";
import ${functionName}View from "./${functionName}.view";

export const ${functionName}: FunctionComponent = (props: any) => {
	return ${functionName}View(props);
};

export default ${functionName};
`,
	pageFunctionView: (functionName) => `import React from "react";

export const ${functionName}View = (props: any) => {
	return (<div>${functionName}</div>);
}

export default ${functionName}View;
`
}

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "newreact" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let createComponent = vscode.commands.registerCommand('newreact.createComponent', function (uri) {
		vscode.window.showInputBox({ placeHolder: 'Component name' }).then(text => {
			if (text === undefined) { return; }
			createFile(uri, text, templates.component(text));
		});
	});
	context.subscriptions.push(createComponent);

	let createPage = vscode.commands.registerCommand('newreact.createPage', function (uri) {
		vscode.window.showInputBox({ placeHolder: 'Component name' }).then(text => {
			if (text === undefined) { return; }
			createFile(uri, text, templates.pageClass(text));
			createFile(uri, text, templates.pageView(text), '.view.tsx');
		});
	});
	context.subscriptions.push(createPage);

	let createFunctionPage = vscode.commands.registerCommand('newreact.createFunctionPage', function (uri) {
		vscode.window.showInputBox({ placeHolder: 'Component name' }).then(text => {
			if (text === undefined) { return; }
			createFile(uri, text, templates.pageFunction(text));
			createFile(uri, text, templates.pageFunctionView(text), '.view.tsx');
		});
	});
	context.subscriptions.push(createFunctionPage);

	let createFunctionComponent = vscode.commands.registerCommand('newreact.createFunctionComponent', function (uri) {
		vscode.window.showInputBox({ placeHolder: 'Component name' }).then(text => {
			if (text === undefined) { return; }
			createFile(uri, text, templates.functionComponent(text));
		});
	});
	context.subscriptions.push(createFunctionComponent);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
