export const LANGUAGE_VERSIONS = {
  javascript: 63,
  python: 71,
  java: 62,
  c: 50,
  cpp: 54,
};

export const LANGUAGE_STARTERS = {
  javascript: `// Starter code for JavaScript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet("World");`,

  python: `# Starter code for Python
def greet(name):
    print(f"Hello, {name}!")
greet("World")`,

  php: `<?php
// Starter code for PHP
function greet($name) {
    echo "Hello, $name!";
}
greet("World");
?>`,

  java: `// Starter code for Java
public class Main {
    public static void main(String[] args) {
        greet("World");
    }

    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}`,

  c: `/* Starter code for C */
#include <stdio.h>

void greet(char* name) {
    printf("Hello, %s!\n", name);
}

int main() {
    greet("World");
    return 0;
}`,

  cpp: `// Starter code for C++
#include <iostream>
using namespace std;

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    greet("World");
    return 0;
}`,
};

import "../../codemirror/mode/clike/clike.js"; // For C, C++, Java, etc.
import "../../codemirror/mode/python/python.js"; // For Python
import "../../codemirror/mode/javascript/javascript.js"; // For JavaScript
import "../../codemirror/mode/shell/shell.js"; // For Shell
import "../../codemirror/mode/php/php.js"; // For JavaScript

export const languagesConfig = {
  cpp: {
    mode: "text/x-c++src",
    name: "cpp",
    version: "10.2.0",
    codeSnippet: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout << "Welcome to CHAP The code editor!" << endl;\n\treturn 0;\n}\n`,
    info: "C++ does not have built-in Tree Set or Tree Map data structures, but you can use `std::set` and `std::map` from the Standard Template Library (STL).",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  python: {
    mode: "text/x-python",
    name: "Python",
    version: "3.10.0",
    codeSnippet: `def welcome():\n\tprint("Welcome to CHAP The code editor!")\n\nwelcome()\n`,
    info: "Python does not have built-in Tree Set or Tree Map data structures, so you may use `sortedcontainers` for sorted data structures.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  javascript: {
    mode: "text/javascript",
    name: "JavaScript",
    version: "18.15.0",
    codeSnippet: `function welcome() {\n\tconsole.log("Welcome to CHAP The code editor!");\n}\n\nwelcome();\n`,
    info: "JavaScript does not have built-in Queue and Priority Queue data structures so you may use datastructures-js/queue and datastructures-js/priority-queue instead.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  java: {
    mode: "text/x-java",
    name: "java",
    version: "15.0.2",
    codeSnippet: `import java.util.*;\nimport java.io.*;\n\npublic class Welcome {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Welcome to CHAP The code editor!");\n\t}\n}\n`,
    info: "Java provides built-in Tree Set and Tree Map data structures in the `java.util` package, which are part of the Java Collections Framework.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  bash: {
    mode: "text/x-sh",
    name: "bash",
    version: "5.2.0",
    codeSnippet: `#!/bin/bash\n\necho "Welcome to CHAP The code editor!"\n`,
    info: "Bash (5.2.0)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  },
  c: {
    mode: "text/x-csrc",
    name: "c",
    version: "10.2.0",
    codeSnippet: `#include <stdio.h>\n\nint main() {\n\tprintf("Welcome to CHAP The code editor!");\n\treturn 0;\n}\n`,
    info: "C does not have built-in Tree Set or Tree Map data structures, but you can use structures to build it.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  },
  php: {
    mode: "text/x-php",
    language: "php",
    version: "8.2.3",
    codeSnippet: `<?php\n\necho "Welcome to CHAP The code editor!";\n`,
    info: "PHP (8.2.3)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
};

import "../../codemirror/theme/dracula.css"; // Dracula theme
import "../../codemirror/theme/ambiance.css"; // Dracula theme
import "../../codemirror/theme/duotone-dark.css"; // duotone-dark theme
import "../../codemirror/theme/midnight.css"; // midnight theme

// themeConfig.js
export const themeConfig = {
  dracula: "dracula",
  ambiance: "ambiance",
  duotoneDark: "duotone-dark",
  midnight: "midnight",
};
