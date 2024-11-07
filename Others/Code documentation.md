## Task One:
after installing the project, I run into eslint errors that I fixed file by file, I almost touched 87 files, whereby in same file I disable the errors using a command such like:
```
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
```
> The most frequently errors I got during the debugging was `no-unused-vars` that means that a variable has been declared but has not being used, another one was omitting the alt in `img` tag. 

## Task Two:
after fixing eslint. I realize that the database that has been used was mysql and I did not have a mysql client or server install in my PC, so I have first to install mysql and then set the connection configuration to match the one in mysql so I have to create `user=root`, `passwrd='P4552wOrd!'`,and add the database `mgldefi`

### Resources
https://www.devart.com/dbforge/mysql/studio/how-to-run-sql-file-in-mysql.html
https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost
https://onecompiler.com/mysql
https://github.com/DyatkoGleb/node-mysql2-migrations
https://stackoverflow.com/questions/17666249/how-to-import-an-sql-file-using-the-command-line-in-mysql
https://serverfault.com/questions/116100/how-to-check-what-port-mysql-is-running-on