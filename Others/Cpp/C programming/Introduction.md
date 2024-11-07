# C Language Introduction
***C** is a procedural programming language initially developed by ***Dennis Ritchie*** in the year **1972*** at Bell Laboratories of AT&T Labs. It was mainly developed as a system programming language to write the **UNIX operating system***

**The main features of the C language include:***
- General Purpose and Portable
- Low-level Memory Access
- Fast Speed
- Clean Syntax
## Why Learn C?

>Learning C provides a strong foundation for understanding many modern programming languages, as many (like Java, PHP, JavaScript) borrow syntax and features from C. C++ is also nearly a superset of C. Starting with C helps you grasp fundamental concepts like pointers and memory management, which are crucial for understanding operating system architecture and low-level programming.

## Difference Between C and C++
- **OOP Support**: C++ supports Object-Oriented Programming (OOP), while C follows a procedural programming paradigm.
- **Exception Handling**: C++ has built-in exception handling, while in C, exceptions must be handled manually.
- **References**: C does not have references, whereas C++ includes reference variables, making certain operations more intuitive.

## Components of a C Program
```cpp
#include <stdio.h>

int main() {
  int a = 10;
  printf("%d", a);
  
  return 0;  
}```
![[Pasted image 20241107031354.png]]

1. **Header Files Inclusion** (e.g., `#include <stdio.h>`)  
   - Header files contain function declarations and macro definitions used across multiple source files.  
   - The preprocessor handles lines starting with `#`, such as `#include`, which includes the contents of the header file into the program.  
   - Common header files:  
     - `stddef.h` – Defines types and macros  
     - `stdint.h` – Defines exact width integer types  
     - `stdio.h` – Defines I/O functions  
     - `stdlib.h` – Defines memory allocation and conversion functions  
     - `string.h` – Defines string handling functions  
     - `math.h` – Defines mathematical functions  

2. **Main Method Declaration** (e.g., `int main()`)  
   - The entry point of a C program.  
   - `int` before `main()` specifies the return type (an integer value indicating program termination status).  
   - Execution begins at the first line of `main()`.  
   - Empty parentheses `()` indicate that `main()` takes no parameters.

3. **Body of Main Method** (e.g., `{ ... }`)  
   - Contains statements that define the logic of the program.  
   - All functions in C are enclosed in curly braces `{ }`.

4. **Statement** (e.g., `printf("Hello World");`)  
   - Instructions to the compiler.  
   - In C, statements end with a semicolon `;`.  
   - `printf()` is commonly used for displaying output.

5. **Return Statement** (e.g., `return 0;`)  
   - Indicates the return value from a function.  
   - The return value from `main()` signals the program's termination status (0 typically means successful execution).

---

**Executing a C Program**

- **Online IDEs**: Use platforms like GeeksforGeeksIDE for quick development without a local compiler.
  
- **Windows**:  
  - Use free IDEs like **Code::Blocks** or **Dev-C++** to write, compile, and run C programs.
  
- **Linux**:  
  - The **GCC compiler** is bundled with most distributions to compile and run C programs.
  - **Code::Blocks** can also be used.

- **macOS**:  
  - Write C code in a text editor, save with a `.c` extension, and use the terminal to compile with GCC.

**Applications of C**

1. **Operating Systems**  
   - C is used to develop operating systems like **Unix**, **Linux**, and **Windows**, due to its low-level capabilities and efficient memory management.

2. **Embedded Systems**  
   - C is widely used in embedded systems for programming **microcontrollers**, **microprocessors**, and various **electronic devices** where performance and direct hardware interaction are crucial.

3. **System Software**  
   - C is key in developing **system software** like **device drivers**, **compilers**, and **assemblers**, allowing for direct control over hardware and efficient resource management.

4. **Networking**  
   - C is used for building **networking applications** such as **web servers**, **network protocols**, and **network drivers** due to its performance and low-level socket programming capabilities.

5. **Database Systems**  
   - C is foundational in building **database systems** like **Oracle**, **MySQL**, and **PostgreSQL**, where performance and resource management are critical for handling large volumes of data.

6. **Gaming**  
   - Many **computer games** are developed in C because it can efficiently manage **low-level hardware interactions** and deliver high-performance graphics and processing.

7. **Artificial Intelligence**  
   - C is used in developing **AI** and **machine learning** applications, particularly for building **neural networks**, **deep learning algorithms**, and other high-performance AI systems.

8. **Scientific Applications**  
   - C is employed in developing **scientific software** for **simulation** and **numerical analysis**, where precision and performance are essential for complex calculations.

9. **Financial Applications**  
   - C is used to develop **financial systems**, such as **stock market analysis** and **trading platforms**, requiring high-speed computations and real-time processing.

> C's versatility and performance make it essential in many areas where system-level control and efficiency are critical.

**Most Important Features of C Language**

1. **Procedural Language**  
   - C follows a procedural programming paradigm, where the program is organized around functions and procedures that operate on data. This approach makes it easier to break down complex tasks into simpler, manageable functions.

2. **Fast and Efficient**  
   - C is known for its high performance and efficiency. Its low-level operations and close-to-hardware nature make it one of the fastest programming languages, suitable for system programming and performance-critical applications.

3. **Modularity**  
   - C supports **modular programming**, which allows developers to divide a program into smaller, reusable functions and modules. This helps improve code organization, readability, and maintainability.

4. **Statically Typed**  
   - C is a statically-typed language, meaning that variable types are defined at compile time. This helps catch type-related errors early in the development process and optimizes performance.

5. **General-Purpose Language**  
   - C is a general-purpose language that can be used for a wide variety of applications, from system software (like operating systems) to application software (such as games and business applications).

6. **Rich Set of Built-in Operators**  
   - C offers a wide variety of **operators** (arithmetic, relational, logical, bitwise, etc.) that allow developers to perform a wide range of operations on data efficiently.

7. **Libraries with Rich Functions**  
   - C comes with a comprehensive set of **standard libraries** (such as `stdio.h`, `stdlib.h`, `math.h`, etc.) that provide useful functions for input/output, memory management, string manipulation, and mathematical operations.

8. **Middle-Level Language**  
   - C is considered a **middle-level language** because it combines the features of both high-level and low-level languages. It provides access to hardware-level operations, memory management, and system resources while still supporting structured programming and abstraction.

9. **Portability**  
   - C programs are highly portable, meaning that code written in C can be run on different hardware platforms with minimal modifications. This is one of the reasons C is used for developing cross-platform applications and operating systems.

10. **Easy to Extend**  
   - C is a flexible language that is **easy to extend**. Developers can write additional functions or libraries, or even interact with other programming languages, making it highly adaptable to new needs.

>These features make C an essential language for system-level programming, embedded systems, performance-critical applications, and more.

## Hello world program

### 1.1 **Using `puts()` Function**

The `puts()` function is used to print a string to the console, followed by a newline character. It is simpler than `printf()` for printing strings without the need for format specifiers.

```c
#include <stdio.h>

int main() {
    puts("Hello, World!");
    return 0;
}
```

### 1.2 **Using `write()` System Call**

The `write()` system call is a low-level way to print output directly to the standard output stream (stdout). It bypasses the C standard library's `stdio.h` and directly interacts with the operating system's I/O mechanisms.

```c
#include <unistd.h>

int main() {
    write(1, "Hello, World!\n", 14); // 1 is the file descriptor for stdout
    return 0;
}
```

### 1.3 **Character-by-Character Printing**

You can print each character one by one using the `putchar()` function. This method prints each character individually rather than printing the entire string at once.

```c
#include <stdio.h>

int main() {
    char str[] = "Hello, World!";
    for (int i = 0; str[i] != '\0'; i++) {
        putchar(str[i]);
    }
    putchar('\n'); // Add a newline after the string
    return 0;
}
```

--- 

> These alternative methods showcase different ways to display "Hello, World!" in C, providing flexibility in how output is handled, from higher-level functions like `puts()` to lower-level system calls like `write()`.

## Compiling a C Program: Behind the Scenes
![[Pasted image 20241107144742.png]]
### 1. Pre-processing
- Removal of Comments
- Expansion of Macros
- Expansion of the included files.
- Conditional compilation
> The preprocessed output is stored in the ***filename.i***
### 2. Compiling
> The next step is to compile filename.i and produce an; intermediate compiled output file ***filename.s***
### 3. Assembling
> In this phase the filename.s is taken as input and turned into ***filename.o** by the assembler
>  This file contains machine-level instructions. At this phase, only existing code is converted into machine language, and the function calls like printf() are not resolved.
### 4. Linking
> This is the final phase in which all the linking of function calls with their definitions is done. Linker knows where all these functions are implemented. Linker does some extra work also, it adds some extra code to our program which is required when the program starts and ends.
---
#### Content
[[Token]]
[[variables]]

---
references:
https://www.geeksforgeeks.org/c-language-introduction/?ref=next_article