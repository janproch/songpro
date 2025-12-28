import * as vscode from 'vscode';
import { transposeText } from './chordTools';

export function activate(context: vscode.ExtensionContext) {
    console.log('SongPro extension is now active');

    // Transpose +1 command
    let transposeUpDisposable = vscode.commands.registerCommand('songpro.transposeUp', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const transposed = transposeText(text, 1);

        editor.edit(editBuilder => {
            editBuilder.replace(selection, transposed);
        });
    });

    // Transpose -1 command
    let transposeDownDisposable = vscode.commands.registerCommand('songpro.transposeDown', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const transposed = transposeText(text, -1);

        editor.edit(editBuilder => {
            editBuilder.replace(selection, transposed);
        });
    });

    // Convert chords to NNS command
    let convertToNNSDisposable = vscode.commands.registerCommand('songpro.convertToNNS', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const converted = transposeText(text, 0, true);

        editor.edit(editBuilder => {
            editBuilder.replace(selection, converted);
        });
    });

    context.subscriptions.push(transposeUpDisposable, transposeDownDisposable, convertToNNSDisposable);
}

export function deactivate() {}
