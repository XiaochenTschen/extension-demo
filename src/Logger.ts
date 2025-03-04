import * as vscode from "vscode";

export class Logger {
    private static getOutputChannel(): vscode.OutputChannel {
      if (!Logger.outputChannel) {
        Logger.outputChannel = vscode.window.createOutputChannel("My Extension");
      }
      return Logger.outputChannel;
    }
  
    static log(message: string) {
      Logger.writeLog("INFO", message);
    }
  
    static error(message: string) {
      Logger.writeLog("ERROR", message);
    }
  
    static warn(message: string) {
      Logger.writeLog("WARN", message);
    }
  
    private static writeLog(level: string, message: string) {
      const config = vscode.workspace.getConfiguration("myExtension");
      const enableDebugLogs = config.get<boolean>("enableDebugLogs", false);
      const formattedMessage = `[${level}] ${message}`;
  
      if (enableDebugLogs) {
        console.log(formattedMessage);
      } else {
        Logger.getOutputChannel().appendLine(formattedMessage);
      }
    }
  }
  