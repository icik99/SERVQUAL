# HOW TO USE

## 1. Clone This Repository

```shell
git clone https://github.com/bangmar/SERVQUAL.git
```

## 2. Install Modules
```shell
npm i
```

## 3. Create MySQL Databse in Your Local
check .evn file and adjust to your database
### This is the format
mysql://USER:PASSWORD@HOST:PORT/DATABASE

## 4. Make sure prisma 
```shell
npx prisma
npx prisma init 
```

Migrate Database using
```shell
npx prisma migrate dev
```


## 5. Run Application
```shell
nodemon .\src\main.js
```