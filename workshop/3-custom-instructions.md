# Exercise 3 - Providing context to Copilot with instruction files

| [← Previous lesson: MCP Servers][previous-lesson] | [Next lesson: Generating Code →][next-lesson] |
|:--|--:|

Context is key across many aspects of life, and when working with generative AI. If you're performing a task which needs to be completed a particular way, or if a piece of background information is important, you want to ensure Copilot has access to that information. You can use [instruction files][instruction-files] to provide guidance so that Copilot not only understands what you want it to do but also how you want it to be done.

In this exercise, you will learn how to:

- provide Copilot with project-specific context, coding guidelines and documentation standards using [repository custom instructions][repository-custom-instructions] **.github/copilot-instructions.md**.
- provide path instruction files to guide Copilot for repetitive or templated tasks on specific types of files.
- implement both repository-wide instructions and task-specific instructions.

> [!IMPORTANT]
> Note that the code generated may diverge from some of the standards you set. AI tools like Copilot are non-deterministic, and may not always provide the same result. The other files in the codebase do not contain docstrings or comment headers, which could lead Copilot in another direction. Consistency is key, so making sure that your code follows the established patterns is important. You can always follow-up in chat and ask Copilot to follow your coding standards, which will help guide it in the right direction.

## Scenario

As any good dev shop, Tailspin Toys has a set of guidelines and requirements for development practices. These include:

- API always needs unit tests.
- UI should be in dark mode and have a modern feel.
- Documentation should be added to code in the form of docstrings.
- A block of comments should be added to the head of each file describing what the file does.

The filtering feature you filed an issue for in [Exercise 2][previous-lesson] needs a backend endpoint that returns the list of publishers. You'll use that real piece of work as the lens for exploring instruction files: generate the **/publishers** endpoint once with the current instructions, see what's missing, update **copilot-instructions.md**, and regenerate it to match Tailspin's standards. The version you keep will feed directly into the filtering work in the next exercise.

## Custom instructions

Custom instructions allow you to provide context and preferences to Copilot, so that it can better understand your coding style and requirements. This is a powerful feature that can help you steer Copilot to get more relevant suggestions and code snippets. You can specify your preferred coding conventions, libraries, and even the types of comments you like to include in your code. You can create instructions for your entire repository, or for specific types of files for task-level context.

There are two types of instructions files:

- **.github/copilot-instructions.md**, a single instruction file sent to Copilot for **every** prompt in the repository. This file should contain project-level information, context which is relevant for most requests sent to Copilot. This could include the tech stack being used, an overview of what's being built and best practices, and other global guidance for Copilot.
- **\*.instructions.md** files can be created for specific tasks or file types. You can use **\*.instructions.md** files to provide guidelines for particular languages (like Python or TypeScript), or for tasks like creating a Svelte component or a new set of unit tests.

## Best practices for managing instructions files

A full conversation about creating instructions files is beyond the scope of the workshop. However, the examples provided in the sample project provide a representative example of how to approach their management. At a high level:

- Keep instructions in **copilot-instructions.md** focused on project-level guidance, such as a description of what's being built, the structure of the project, and global coding standards.
- Use **\*.instructions.md** files to provide specific instructions for file types (unit tests, Svelte components, API endpoints), or for specific tasks.
- Use natural language in your instructions files. Keep guidance clear. Provide examples of how code should (and shouldn't) look.

There isn't one specific way to create instructions files, just as there isn't one specific way to use AI. You will find through experimentation what works best for your project. The guidance provided here and the [resources](#resources) below should help you get started.

> [!TIP]
> Every project using GitHub Copilot should have a robust collection of instructions files to provide context and best guide code generation. As you explore the instructions files in the project, you may notice there are ones for numerous types of files and tasks, including [Tailwind CSS styling][tailwind-instructions] and [Astro][astro-instructions]. The investment made in instructions files will greatly enhance the quality of code suggestions from Copilot, ensuring it better matches the style and requirements your organization has.
>
> If you're looking for templates or a starting point for instructions files, you can explore [awesome-copilot][awesome-copilot], a repository full of instructions files, custom agents, and other resources to help you out!

## Explore the custom instructions files

Let's start by exploring the instructions files created for this project. You'll notice there's one core **copilot-instructions.md** file, and a collection of **.instructions** files for various tasks.

1. Return to your codespace.
2. Open **.github/copilot-instructions.md**.
3. Explore the file, noting the brief description of the project and sections for **Code standards**, **Scripts** and **GitHub Actions Workflows**. These are applicable to any interactions you'd have with Copilot, are robust, and provide clear guidance on what you're doing and how you want to accomplish it.
4. Open **.github/instructions**, and explore the files contained inside it. Note there are instructions for Astro files, Svelte files, the various tests, and others.
5. Open **.github/instructions/python-tests.instructions.md**. Make note of the `applyTo` section in the frontmatter. This sets the path, relative to the root of the project, which determines which files the instructions apply to. In this case, any Python files in the **server/tests** folder with a name that starts with **test_** will match the slug.
6. Note the instructions specific to creating Python tests for this project.
7. Finally, open **.github/instructions/flask-endpoint.instructions.md**, and scroll to the bottom of the file. Note the links to other instructions files and existing files in the project. This allows you to both break larger instruction sets into smaller, reusable files, and to point to examples Copilot should consider when generating code. Note these paths are relative to the instructions file rather than the root of the project.

## Examine the impact of custom instructions

To see the impact of custom instructions, you'll start by sending a prompt with the current version of the files, and see how Copilot pulls those files into context. Then you'll make some updates, send the same prompt again, and note the difference.

1. Return to your codespace.
2. If not already open, open a terminal window by pressing <kbd>Ctrl</kbd>+<kbd>\`</kbd>.
3. If Copilot CLI isn't already running from the prior exercise, start it in YOLO mode:

   ```bash
   copilot --yolo --enable-all-github-mcp-tools
   ```

4. If Copilot CLI is already running, clear its context by sending the `/clear` command in the prompt.
5. Set the model by sending the `/model` command in the prompt and selecting **Claude Sonnet 4.5**.

> [!NOTE]
> The workshop is set to use Claude Sonnet 4.5 as it's the model used while authoring the workshop. This isn't an indication of preference of one model over another.

6. Send the following prompt to have Copilot create a new endpoint to return all publishers, along with the matching tests. Asking for tests explicitly ensures we'll see the `python-tests.instructions.md` file pulled into context:

   ```text
   Create a new endpoint to return a list of all publishers in server/routes/publishers.py. The endpoint should return the name and id for all publishers. Also generate unit tests for the new endpoint in server/tests.
   ```

7. Copilot will explore the project to learn how best to implement the code, and generate the code for `publishers.py`, updates to `app.py`, and tests under `server/tests/`.
8. While Copilot works, note the **Reading instructions** lines in the output. They should reference **copilot-instructions.md** as well as the **.instructions.md** files for creating Flask endpoints and Python tests. The former is included in every request, while the latter are loaded whenever a file matches the slug in the `applyTo` frontmatter of an **.instructions** file.

> [!TIP]
> You can review the loaded instructions, MCP servers, skills, agents and other context at any time by sending the `/env` command to Copilot CLI.

9. When Copilot is done, open **server/routes/publishers.py** in the codespace editor.
10. Explore the code, noticing the generated code includes [type hints][python-type-hints] because, as you'll see in a moment, the custom instructions include the directive to include them.
11. Notice the generated code **is missing** either a docstring or a comment header — or both!

> [!IMPORTANT]
> As highlighted previously, GitHub Copilot and LLM tools are probabilistic, not deterministic. As a result, the exact code generated may vary, and there's even a chance it'll abide by your rules without you spelling it out! But to aid consistency in code you should always document anything you want to ensure Copilot understands about how you want your code generated.

12. Discard the generated endpoint and tests so you can re-run the prompt with updated instructions. In Copilot CLI, send the following command to rewind the last turn and revert the files Copilot just created or modified:

    ```text
    /undo
    ```

## Add new repository standards to copilot-instructions.md

As highlighted previously, `copilot-instructions.md` is designed to provide project-level information to Copilot. Let's ensure repository coding standards are documented to improve code suggestions from Copilot.

1. Return to your codespace.
2. Open `.github/copilot-instructions.md`.
3. Locate the **Code formatting requirements** section, which should be near line 35. Note how it contains a note to use type hints. That's why you saw those in the code generated previously.
4. Add the following lines of markdown right below the note about type hints to instruct Copilot to add comment headers to files and docstrings:

   ```markdown
   - Every function should have docstrings or the language equivalent.
   - Before imports or any code, add a comment block to the file that explains its purpose.
   ```

5. Save and close **copilot-instructions.md**.
6. Return to your Copilot CLI terminal.
7. Send `/clear` to start a fresh conversation so Copilot reloads instructions with no carry-over context.
8. Send a slightly expanded version of the original prompt so Copilot generates both the endpoint and the matching tests (the tests will give us a chance to see a path-specific **.instructions** file in action shortly):

   ```text
   Create a new endpoint to return a list of all publishers in server/routes/publishers.py. The endpoint should return the name and id for all publishers. Also generate unit tests for the new endpoint in server/tests.
   ```

9. Open **server/routes/publishers.py** again and notice how the newly generated code includes a comment header at the top of the file which resembles the following:

   ```python
   """
   Publisher API routes for the Tailspin Toys Crowd Funding platform.
   This module provides endpoints to retrieve publisher information.
   """
   ```

10. Notice how the newly generated code includes a docstring inside the function which resembles the following:

    ```python
    """
    Returns a list of all publishers with their id and name.

    Returns:
       Response: JSON response containing an array of publisher objects
    """
    ```

11. Notice the generated code now includes a docstring as well as a comment block at the top!
12. Also note how the existing code isn't updated, but of course you could ask Copilot to perform that operation if you so desired.
13. **Keep everything as-is.** Both your edit to `.github/copilot-instructions.md` and the generated `/publishers` endpoint (with its tests) are now part of the project — the filtering work in the next exercise will use this endpoint.

From this section, you explored how the custom instructions file has provided Copilot with the context it needs to generate code that follows the established guidelines.

## Take a closer look at the .instructions file in action

Your focus in the last two sets of steps was on **copilot-instructions.md**, the global instructions file used for every request. The endpoint you just generated also pulled in a path-specific **.instructions** file for the test code.

**.instructions** files can contain an `applyTo` setting in their frontmatter, which allows you to specify a slug or path. Copilot will utilize these instructions whenever it works on a file which matches the slug. In our case, we have an instructions file for Python tests defined at **.github/instructions/python-tests.instructions.md**, which will be used by Copilot for any files which match the pattern **server/tests/test\_*.py**.

1. Scroll back through Copilot CLI's output from the previous run and find the **Reading instructions** lines. You should see **copilot-instructions.md** as well as **python-tests.instructions.md** and **flask-endpoint.instructions.md**.
2. Open the generated test file under **server/tests/** (it will be named after the new endpoint). Based on the guidance in **python-tests.instructions.md**, it should:
   - contain a class-level `TEST_DATA` variable with testing data.
   - utilize in-memory SQLite for its database.
   - contain both setup and teardown functions.
3. Open **.github/instructions/python-tests.instructions.md** and skim the rules to see how they map to what was produced.
4. Leave the generated files in place — they'll be used by the filtering feature in the next exercise. Your `.github/copilot-instructions.md` edit also stays in place.

## Summary and next steps

Congratulations! You explored how to ensure Copilot has the right context to generate code following the practices your organization has set forth. This can be done at a repository level with the **.github/copilot-instructions.md** file, or on a task basis with instruction files. You explored how to:

- provide Copilot with project-specific context, coding guidelines and documentation standards using custom instructions (.github/copilot-instructions.md).
- use instruction files to guide Copilot for repetitive or templated tasks.
- implement both repository-wide instructions and task-specific instructions.

Next we'll use plan mode to [generate the filtering feature][next-lesson] on top of the endpoint you just created.

## Resources

- [Instruction files for GitHub Copilot customization][instruction-files]
- [5 tips for writing better custom instructions for Copilot][copilot-instructions-five-tips]
- [Best practices for creating custom instructions][instructions-best-practices]
- [Personal custom instructions for GitHub Copilot][personal-instructions]
- [Awesome Copilot - a collection of instructions files and other resources][awesome-copilot]

---

| [← Previous lesson: MCP Servers][previous-lesson] | [Next lesson: Generating Code →][next-lesson] |
|:--|--:|

[previous-lesson]: ./2-mcp.md
[next-lesson]: ./4-generating-code.md
[instruction-files]: https://code.visualstudio.com/docs/copilot/copilot-customization
[repository-custom-instructions]: https://docs.github.com/copilot/how-tos/configure-custom-instructions/add-repository-instructions
[python-type-hints]: https://docs.python.org/3/library/typing.html
[instructions-best-practices]: https://docs.github.com/enterprise-cloud@latest/copilot/using-github-copilot/coding-agent/best-practices-for-using-copilot-to-work-on-tasks#adding-custom-instructions-to-your-repository
[personal-instructions]: https://docs.github.com/copilot/customizing-copilot/adding-personal-custom-instructions-for-github-copilot
[copilot-instructions-five-tips]: https://github.blog/ai-and-ml/github-copilot/5-tips-for-writing-better-custom-instructions-for-copilot/
[awesome-copilot]: https://github.com/github/awesome-copilot
[tailwind-instructions]: ../.github/instructions/tailwindcss.instructions.md
[astro-instructions]: ../.github/instructions/astro.instructions.md
