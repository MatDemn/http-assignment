export async function runLoopedWithTimeout(timeout: number, func: () => Promise<any>) {
    await func();
    setTimeout(() => runLoopedWithTimeout(timeout, func), timeout);
}