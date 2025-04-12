# Astro Standards

### 1. Code Quality
- Follow consistent naming conventions for variables, functions, and files.
- Ensure code is modular and reusable.
- Use comments to explain complex logic or calculations.

### 2. File Structure
 **Every Astro project root should include the following directories and files:**

  - You can find this information in [src/README.md](https://github.com/101-Coconsulting/TC3005B.501-Frontend/blob/main/src/README.md) file in the astro project.

Example for our astro project

<starlight-file-tree>

<ul>
  <li class="directory">
    <details open>
      <summary>public/</summary>
      <ul>
        <li class="directory">
          <details open>
            <summary>images/</summary>
            <ul>
              <li class="file">image1.jpg</li>
              <li class="file">image2.jpg</li>
              <li class="file">image3.jpg</li>
            </ul>
          </details>
        </li>
        <li class="file">robots.txt</li>
        <li class="file">favicon.svg</li>
        <li class="file">my-cv.pdf</li>
      </ul>
    </details>
  </li>

  <li class="directory">
    <details open>
      <summary>src/</summary>
      <ul>
        <li class="directory">
          <details open>
            <summary>blog/</summary>
            <ul>
              <li class="file">post1.md</li>
              <li class="file">post2.md</li>
              <li class="file">post3.md</li>
            </ul>
          </details>
        </li>
        <li class="directory">
          <details open>
            <summary>components/</summary>
            <ul>
              <li class="file">Header.astro</li>
              <li class="file">Button.jsx</li>
            </ul>
          </details>
        </li>
        <li class="directory">
          <details open>
            <summary>layouts/</summary>
            <ul>
              <li class="file">PostLayout.astro</li>
            </ul>
          </details>
        </li>
        <li class="directory">
          <details open>
            <summary>pages/</summary>
            <ul>
              <li class="file">index.astro</li>
              <li class="file">about.astro</li>
              <li class="directory">
                <details open>
                  <summary>posts/</summary>
                  <ul>
                    <li class="file">[post].astro</li>
                  </ul>
                </details>
              </li>
              <li class="file">rss.xml.js</li>
            </ul>
          </details>
        </li>
        <li class="directory">
          <details open>
            <summary>styles/</summary>
            <ul>
              <li class="file">global.css</li>
            </ul>
          </details>
        </li>
        <li class="file">content.config.ts</li>
      </ul>
    </details>
  </li>

  <li class="file">astro.config.mjs</li>
  <li class="file">package.json</li>
  <li class="file">tsconfig.json</li>
</ul>

</starlight-file-tree>


### 3. Naming conventions

When working with variables, functions, and constants in Astro projects, adhere to the following standards:

 - Variables
    + Use `camelCase` for variable names.
    + Variable names should be descriptive and meaningful. (e.g., `userName`)
    + Avoid single-letter variable names unless used in loops (e.g., `i`, `j`).

- Functions
    + Use `camelCase` for function names.
    + Function names should clearly describe their purpose or action (e.g., `fetchData`, `calculateTotal`).
    + Keep functions small and focused on a single responsibility.
    + Use arrow functions (`const myFunction = () => {}`) unless a named function is required.

- Constants
    + Use `UPPER_SNAKE_CASE` for constants.
 Constants should be declared using `const` and should not be reassigned.
    + Group related constants together for better readability.
    + Constants names should be descriptive and meaningful.

- Environment Variables
    + Use `UPPER_SNAKE_CASE` for environment variable names.
    + Prefix environment variables with the project name or a relevant namespace (e.g., `ASTRO_API_KEY`).
    + Store sensitive environment variables in a `.env` file and **NEVER** commit this file to version control.
    + Access environment variables using `import.meta.env` in Astro.

### 4. Comments

- Start the file with a short paragraph explaining its purpose.
- Document the purpose of functions, components, and modules with comments at the top of their definitions.
- Use comments to clarify complex or non-obvious code logic.
- Write comments in plain English and keep them concise.
- Use single-line comments (`<!-- comment -->`) for brief explanations and multi-line comments (`<!-- \n comment  \n -->`) for detailed descriptions.
- Avoid redundant comments that simply restate the code.
- Use `ToDo:` comments to indicate areas that need further work or improvement.
- For debugging purposes, use comments to explain temporary code and remove them once the code is finalized.
- Maintain updated comments to reflect any changes in the code.
- Avoid leaving commented-out code in the final version unless it serves a clear purpose.
