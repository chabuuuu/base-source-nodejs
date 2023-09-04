This is a Node.js-based source code that uses the IOC design pattern and PostgreSQL as the database, employing two ORM options: TypeORM and Prisma. The choice between TypeORM and Prisma is determined by the configuration in the .env file, where 1 represents TypeORM, and 2 represents Prisma.

This API manages an employee table, providing CRUD operations (create, read, update, delete). It also includes the capability to upload images and videos.

Additionally, this base source is used for comparing TypeORM and Prisma performance with self-inserted data exceeding 100,000 rows.
