# Terminal commands

Here is a guide to some of the most commonly used terminal commands. These are the same in Linux and Mac terminals, as well as in Git bash.

## Navigation Commands

- `pwd`: prints the current working directory
- `ls`: lists all files and directories in the current directory
- `cd <directory>`: changes the current directory to the specified directory
    + Use `cd ..` to move up one level in the file system hierarchy
    + Use `cd ~` to navigate to your home directory
- `mkdir <directory>`: creates a new directory with the given name
- `rmdir <directory>`: removes an empty directory
- `rm -rf <directory>`: forcefully removes a directory (and its contents)

## File Management Commands

- `touch <file>`: creates a new empty file with the given name
- `cp <source> <destination>`: copies the source file to the destination location
- `mv <source> <destination>`: moves or renames the source file to the destination location
- `rm <file>`: removes a file
- `cat <file>`: displays the contents of a file on the console
- `less <file>`: displays the contents of a file on the console, page by page
- `head <file>`: displays the first few lines of a file
- `tail <file>`: displays the last few lines of a file
- `find <path> -name "<pattern>"`: searches for files matching the given pattern under the specified path
- `locate <pattern>`: quickly finds files containing the given pattern by searching a precompiled database
- `grep <pattern> <file>`: searches for the given pattern within the contents of the specified file

### Using grep

The grep command allows you to search for specific patterns within text files. You can specify the pattern either directly on the command line or in a separate file.

Here are some examples of how to use grep with different types of patterns:

- **Fixed strings**: If you want to search for a fixed string, simply pass it as the argument to grep. For example, to search for the word "error" in a file called log.txt, you could run:

```
grep error log.txt
```

- **Regular expressions**: By default, grep uses basic regular expressions (BREs). However, you can also use extended regular expressions (EREs) by adding the -E flag. Regular expressions allow you to perform more complex searches than simple fixed strings. For instance, suppose you wanted to search for any lines containing either "error" or "warning". Using BREs, you could do this:

```
grep 'error\|warning' log.txt
```

**Note the backslash before the pipe character; without it, grep interprets the pipe as meaning "or", which we don't want here because our regex includes literal pipes. With EREs, however, you can avoid having to escape the pipe like this:**

```
grep -E 'error|warning' log.txt
```
- **Word boundaries:** Sometimes, you might only be interested in matches where a particular word appears by itself, rather than part of another word. In such cases, you can use word boundary assertions. These tell `grep` to look for the exact word, instead of substrings. To illustrate, let's say you wanted to search for instances of the word "debug":

```
grep debug log.txt
```

Without word boundaries, this will also match words like "undebugged". But if you add word boundaries around your search term, like so:

```
grep '\bserver\b' log.txt
```

then `grep` will only match whole words that exactly match "server".

- **Case insensitivity:** By default, `grep` performs case-sensitive matches. That means that uppercase letters won't match lowercase ones. If you want to make your search case-insensitive, you can add the `-i` flag:

```
grep -i Error log.txt
```

- **Inverting matches:** Finally, sometimes you might want to exclude certain lines from your results. One way to achieve this is by inverting the sense of your search. Instead of looking for lines that contain a particular pattern, you look for lines that don't contain that pattern. You can accomplish this with the `-v` option:

```
grep -v Debug log.txt
```

This would display every line in `log.txt` *except* those containing "Debug".

## xargs 

The xargs command reads items from standard input (stdin), splits them according to whitespace, and transforms them into arguments for subsequent shell commands. Its primary purpose is automating repetitive tasks, making scripting easier, and processing bulk inputs more manageable.

The basic syntax is as follows:

```
cmd1 | xargs cmd2 [-options ...]
```

Here, cmd1 generates the input for xargs, which formats and transfers it as arguments to cmd2. Optionally, you can apply flags to modify cmd2's behavior.

Example: Creating directories

Suppose you have a list of names separated by spaces and wish to generate corresponding directories:

$ echo dir1 dir2 dir3 | xargs mkdir

In this scenario, echo produces the input ("dir1 dir2 dir3"), which xargs translates into discrete arguments for mkdir.

## Pipe symbol

The pipe symbol `|` in the terminal is used to redirect the standard output (stdout) of one command as input to another command. It essentially lets you chain together multiple commands, allowing you to combine their functionality and operate on the same set of data sequentially.

Here are some common examples demonstrating the power of pipelines:

1. Concatenate two files and paginate the output:

```
cat file1.txt file2.txt | less
```

2. Display the first 10 lines of a long file using head:

``` 
head -n 10 bigfile.txt
```

What if you wanted to view the first 10 lines and ensure they weren't truncated? Simply pipe the output to less:

```
head -n 10 bigfile.txt | less
```

Find all C++ files (*.cpp) in a folder recursively and display their contents:

```
find path/to/folder -type f -iname '*.cpp' | xargs cat
```

First, find locates all C++ files inside the specified directory. Next, xargs takes the output produced by find and runs cat repeatedly, feeding each file's contents as stdin to the next invocation.

## Process Management Commands

- `ps aux`: shows information about currently running processes
- `top`: dynamically updates information about currently running processes
- `kill <pid>`: sends a signal to terminate the process with the given ID
- `pkill <pattern>`: sends a signal to terminate all processes whose names match the given pattern

## Networking Commands

- `ifconfig`: displays network interface configuration information
- `ping <host>`: tests connectivity to another host by sending ICMP echo requests
- `netstat`: displays various networking-related statistics

## User Management Commands

- `whoami`: displays the username of the current user
- `su <username>`: switches to the account of the specified user
- `sudo <command>`: executes the command as root or another user
- `useradd <username>`: adds a new user to the system
- `passwd <username>`: sets or changes the password of the specified user