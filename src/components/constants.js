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
