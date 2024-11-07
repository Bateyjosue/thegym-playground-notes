## Git init --bare
> creates a bare Git repository, which is a repository without a working directory that can't be used for writing code
> Bare repositories are typically used for sharing a repository among multiple people, such as for administrative management or publishing changes to the public. 

Here are some things to know about bare Git repositories: 

- **Creating a bare repository**: To create a bare repository, use the `git init --bare` command. Bare repositories are usually named with a `.git` suffix, such as `my_project.git`. 
- **Cloning a bare repository**: To clone a bare repository, use the `git clone --bare` command. 
- **Using a bare repository**: Bare repositories are used for pushing and pulling, but not for committing changes. They are intended for automated scripts and deployment workflows, and not for local development. 
- **Central repositories**: Central repositories should always be bare, as pushing branches to a non-bare repository can overwrite changes. 
- **Local repositories**: Developers' local repositories should not be bare

You never know what you can do until you try.

– William Cobbett