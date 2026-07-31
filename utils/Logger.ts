export class Logger {
    static info(message: string): void {
        console.log(`ℹ️ [${new Date().toISOString()}] ${message}`);
    }

    static warn(message: string): void {
        console.warn(`⚠️ [${new Date().toISOString()}] ${message}`);
    }

    static error(message: string): void {
        console.error(`❌ [${new Date().toISOString()}] ${message}`);
    }

    static success(message: string): void {
        console.log(`✅ [${new Date().toISOString()}] ${message}`);
    }
}