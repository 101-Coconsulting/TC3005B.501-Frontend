export function unauthorizedPage(pathname: string, isAuthenticated: boolean): string {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found</title>
    <link rel="icon" href="/favicon.svg" />
    <style>
        html, body {
        margin: 0;
        padding: 0;
        font-family: system-ui, sans-serif;
        background: linear-gradient(135deg,#0f2027,#203a43,#2c5364);
        color: white;
        min-height: 100vh;
        }
        main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        }
        .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 40rem;
        margin: 0 auto;
        text-align: center;
        }
        h1 {
        font-size: 3rem;
        font-weight: 800;
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: baseline;
        margin-bottom: 0.5rem;
        }
        h1 span:first-child {
        color: #f87171;
        }
        p {
        margin-top: 1rem;
        font-size: 1.125rem;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        max-width: 25rem;
        }
        code {
        font-family: monospace;
        background: #203a43;
        color: #d1d5db;
        padding: 0.75rem;
        border-radius: 0.375rem;
        display: block;
        border: 1px solid #6b7280;
        margin-top: 1.5rem;
        max-width: 100%;
        overflow-x: auto;
        }
        .button-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 6rem;
        }
        .btn {
        background-color: #2563eb;
        color: white;
        font-weight: 600;
        padding: 0.75rem 2rem;
        border-radius: 0.375rem;
        text-decoration: none;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: background-color 0.2s ease;
        }
        .btn:hover {
        background-color: #1d4ed8;
        }
        img {
        width: 64px;
        height: 64px;
        filter: drop-shadow(0 0 30px black);
        }
    </style>
    </head>
    <body>
    <main>
        <div class="container">
        <img src="/favicon.svg" alt="Not found icon" />
        <h1><span>404:</span> <span style="font-weight: normal">Not Found</span></h1>
        <p>¡Ups! Parece que estás perdido o no tienes permiso para acceder a esta página.</p>
        <code>Path: ${pathname}</code>
        </div>
        <div class="button-wrapper">
        <a href="${isAuthenticated ? '/dashboard' : '/login'}" class="btn">
            ${isAuthenticated ? 'Go to Dashboard' : 'Go to Login'}
        </a>
        </div>
    </main>
    </body>
</html>`;
}
