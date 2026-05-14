import React from "react";
import CodeExample, { HERO_AGENTS_MD } from "@/components/CodeExample";
import GitHubIcon from "@/components/icons/GitHubIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import CopyIcon from "@/components/icons/CopyIcon";

const PAGE_MARKDOWN = `# AGENTS.md

A simple, open format for guiding coding agents, used by over 60k open-source projects.

Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project.

## Why AGENTS.md?

README.md files are for humans: quick starts, project descriptions, and contribution guidelines.

AGENTS.md complements this by containing the extra context coding agents need, such as build steps, tests, conventions, security notes, and pull request guidance.

AGENTS.md helps teams:

- Give agents a clear, predictable place for instructions.
- Keep READMEs concise and focused on human contributors.
- Provide precise, agent-focused guidance that complements existing docs.

## Compatibility

One AGENTS.md file can work across many AI coding agents and tools, including Codex, Amp, Jules, Cursor, Factory, RooCode, Aider, Gemini CLI, goose, Kilo Code, opencode, Phoenix, Zed, Semgrep, Warp, GitHub Copilot coding agent, VS Code, Ona, Devin, Windsurf, UiPath, Augment Code, and Junie.

## Example AGENTS.md

\`\`\`markdown
${HERO_AGENTS_MD}
\`\`\`

## How to use AGENTS.md

1. Create an AGENTS.md file at the root of your repository.
2. Add sections that help an agent work effectively with your project.
3. Include build commands, test commands, code style guidelines, security considerations, and PR instructions.
4. In large monorepos, place nested AGENTS.md files inside subprojects so local instructions can override broader ones.

## FAQ

### Are there required fields?

No. AGENTS.md is standard Markdown. Use the headings that fit your project.

### What if instructions conflict?

The closest AGENTS.md to the edited file wins, and explicit user chat prompts override everything.

### Can I update it later?

Yes. Treat AGENTS.md as living documentation.

## Links

- Website: https://agents.md
- GitHub: https://github.com/agentsmd/agents.md
- Examples: https://github.com/search?q=path%3AAGENTS.md+NOT+is%3Afork+NOT+is%3Aarchived&type=code

## Rachel's Cupcake Order

Rachel's cupcake order is loaded from the local \`/api/rachel-order\` endpoint and shown at the bottom of the page.
`;

export default function Hero() {
  const [copiedMarkdown, setCopiedMarkdown] = React.useState(false);

  const downloadMarkdown = () => {
    const blob = new Blob([PAGE_MARKDOWN], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "agents-md-page.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(PAGE_MARKDOWN);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    } catch (err) {
      console.error("Failed to copy page markdown:", err);
    }
  };

  return (
    <header className="px-6 py-20 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/*
          On large screens we want the primary CTA buttons to align with the
          bottom edge of the code block rendered in the right column. Making
          the left column a full-height flex container and pushing the CTA row
          to the bottom (via `lg:justify-between`) achieves this without
          disturbing the natural flow on small screens where the layout stacks
          vertically.
        */}
        <div className="flex flex-col items-start text-left sm:items-start max-w-prose">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">AGENTS.md</h1>

          <p className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            A simple, open format for guiding coding agents,{" "}
            <br className="hidden sm:block" />
            used by over{" "}
            <a
              href="https://github.com/search?q=path%3AAGENTS.md+NOT+is%3Afork+NOT+is%3Aarchived&type=code"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              60k open-source projects
            </a>
            .
          </p>

          <p className="mt-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300 pr-4">
            Think of AGENTS.md as a <strong>README for agents</strong>: a dedicated,
            predictable place to provide the context and instructions to help AI coding agents work on your project.
          </p>

        <div className="mt-6 flex gap-4 flex-col sm:flex-row sm:flex-wrap w-full sm:w-auto justify-center sm:justify-start">
          {/* Primary CTA — scroll to the Examples section */}
          <a
            href="#examples"
            className="inline-block px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium text-center hover:opacity-80"
          >
            Explore Examples
          </a>
          {/* Secondary CTA — view on GitHub */}
          <a
            href="https://github.com/agentsmd/agents.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <GitHubIcon className="w-4 h-4 text-current" />
            View on GitHub
          </a>
          <button
            type="button"
            onClick={downloadMarkdown}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <DownloadIcon />
            Download Markdown
          </button>
          <button
            type="button"
            onClick={copyMarkdown}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <CopyIcon />
            {copiedMarkdown ? "Copied" : "Copy Markdown"}
          </button>
        </div>
        </div>
        <div className="w-full md:max-w-none">
          <CodeExample
            compact
            heightClass="min-h-[160px] max-h-[300px]"
            code={HERO_AGENTS_MD}
            href="https://github.com/openai/codex/blob/main/AGENTS.md"
          />
        </div>
      </div>
    </header>
  );
}
