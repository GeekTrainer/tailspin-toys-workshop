# Exercise 1 - Installing GitHub Copilot CLI

| [← Previous lesson: Prerequisites][previous-lesson] | [Next lesson: MCP Servers →][next-lesson] |
|:--|--:|

[GitHub Copilot CLI][about-copilot-cli] is a powerful agentic coding assistant that runs in your terminal, enabling you to explore codebases, generate code, run commands, and interact with external tools - all from the command line.

## Scenario

Tailspin Toys is a nascent organization with a website that's lacking in many features. Their backlog is continuing to grow, and there's a strong demand to grow. To aid the developers, they want to begin utilizing AI agents through Copilot CLI. This will allow developers to be more productive, as they can focus on the bigger picture while moving faster. The first step to doing this is, of course, to install Copilot CLI!

In this exercise, you will learn how to:

- install GitHub Copilot CLI using npm.
- authenticate with your GitHub account.
- verify the installation.

## Open a terminal in your codespace

Before installing Copilot CLI, you need to open a terminal window in VS Code.

1. Return to your codespace if you're not already there.
2. Open a terminal window by pressing <kbd>Ctrl</kbd>+<kbd>\`</kbd>.
3. You should see a terminal panel appear at the bottom of your VS Code window.

## Install Copilot CLI

GitHub Codespaces come with Node.js pre-installed, so you can use npm to install Copilot CLI globally.

1. In the terminal, verify Node.js is installed and meets the version requirement:

   ```bash
   node --version
   ```

   You should see version 22 or higher (e.g., `v22.x.x`).

2. Install Copilot CLI globally using npm:

   ```bash
   npm install -g @github/copilot
   ```

3. Verify the installation by checking the version:

   ```bash
   copilot --version
   ```

   You should see the version number displayed (e.g., `v1.x.x`).

> [!TIP]
> If you encounter permission errors, you may need to use `sudo npm install -g @github/copilot` on some systems. However, this shouldn't be necessary in GitHub Codespaces.

## Authenticate with GitHub

On first launch, Copilot CLI will prompt you to authenticate with your GitHub account.

1. Start Copilot CLI in YOLO mode, which automatically approves any tool, file, or URL access for the rest of the workshop. The `--enable-all-github-mcp-tools` flag turns on the full set of GitHub MCP tools (more on that in the next exercise):

   ```bash
   copilot --yolo --enable-all-github-mcp-tools
   ```

> [!IMPORTANT]
> `--yolo` is equivalent to combining `--allow-all-tools`, `--allow-all-paths`, and `--allow-all-urls`. Copilot will have the same access you do — files, network, and shell — without asking you to approve each action. This is convenient for the workshop in a disposable codespace, but read the [security considerations][security-considerations] before using it on code you care about.

2. If you're not currently logged in, Copilot CLI will prompt you to run the `/login` slash command. Enter `/login` and follow the on-screen instructions:
   - Open the provided URL in your browser
   - Enter the device code when prompted
   - Authorize Copilot CLI to access your GitHub account

3. Once authenticated, you'll see the Copilot CLI prompt, ready to accept your questions and commands.

> [!NOTE]
> In a codespace, you may already be authenticated through your GitHub session. If Copilot CLI starts without prompting for authentication, you're good to go!

## Trust the directory

When you first use Copilot CLI in a directory, it will ask you to confirm that you trust the files in that folder. This is a security feature to prevent Copilot from accidentally working with untrusted code.

1. When prompted, you'll see three options:
   - **Yes, proceed**: Trust for this session only
   - **Yes, and remember this folder for future sessions**: Trust permanently
   - **No, exit (Esc)**: Don't allow file access
2. For this workshop, select **Yes, and remember this folder for future sessions** since you'll be working in this repository throughout.

## Verify everything is working

Let's make sure Copilot CLI is properly installed and connected.

1. If you exited Copilot CLI, start it again:

   ```bash
   copilot --yolo --enable-all-github-mcp-tools
   ```

2. Ask Copilot a simple question to verify it's working:

   ```
   What files are in this project?
   ```

3. Copilot should explore the repository and provide a summary of the project structure.
4. Try the `/help` command to see available slash commands:

   ```
   /help
   ```

## Summary and next steps

Congratulations! You've successfully installed and authenticated GitHub Copilot CLI. You learned how to:

- install Copilot CLI using npm.
- authenticate with your GitHub account.
- trust a directory for Copilot CLI to work with.
- verify the installation is working correctly.

Now that Copilot CLI is installed, let's extend it with external tools. Continue to [Exercise 2 - MCP Servers][next-lesson].

## Resources

- [Installing GitHub Copilot CLI][install-copilot-cli]
- [About Copilot CLI][about-copilot-cli]
- [Using Copilot CLI][using-copilot-cli]

---

| [← Previous lesson: Prerequisites][previous-lesson] | [Next lesson: MCP Servers →][next-lesson] |
|:--|--:|

[previous-lesson]: ./0-prereqs.md
[next-lesson]: ./2-mcp.md
[install-copilot-cli]: https://docs.github.com/copilot/how-tos/set-up/install-copilot-cli
[about-copilot-cli]: https://docs.github.com/copilot/concepts/agents/about-copilot-cli
[using-copilot-cli]: https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli
[security-considerations]: https://docs.github.com/copilot/concepts/agents/about-copilot-cli#security-considerations
