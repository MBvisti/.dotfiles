---
id: knowledge-database--psql-index
aliases:
  - psql
tags:
  - database
---

[Back To Index](../index.md)

# Postgres

<!--toc:start-->
- [Postgres](#postgres)
  - [Creating users](#creating-users)
  - [Unnest](#unnest)
  - [Failure to connect](#failure-to-connect)
  - [Kill connections](#kill-connections)
  - [Articles](#articles)
<!--toc:end-->

## Creating users
  - To create a user: `CREATE USER name-here;`
  - To create a user with password: `CREATE USER name-here WITH PASSWORD 'password-here';`
  - To create a user with role: `CREATE USER name-here WITH roles-here;`

## Unnest
Write something about this down and this pattern:
```sql 
update test as t set
    column_a = c.column_a
from (values
    (unnest(@ids::uuid[])),
) as c(column_b, column_as) 
where c.column_b = t.column_b;
```
OR
```sql 
update products 
set updated_at = now(), collection_id = data_table.new_collection_id
from (select unnest(@ids::uuid[]) as product_to_update_id, unnest(@collection_ids::uuid[]) as new_collection_id) as data_table
where id = data_table.product_to_update_id
returning id, title, "type", created_at, updated_at, retired_at, collection_id, market_id, is_configurable_pack, top_level_collection_id;
```

## Failure to connect
If an user receives `Peer authentication failed for user “any-user-name-here”`, it's due to the fact that
psql by default connects over UNIX sockets using `peer` authentication. This just means that the logged in user
trying to make the connection, needs to have the same name as the psql user (this is why you need to switch to
postgres when connecting, if you haven't made a new psql user with the same login name as the OS one).

The fix is to either create a new UNIX user with the same username as the one in postgres, or switch the auth
method to be `md5` in the `pg_hba.conf`, located at `/etc/postgresql/14/main/`, i.e. change this:
`local   all             postgres                                peer` 
to be:
`local   all             postgres                                md5`

## Kill connections
Start by getting active pids:
```sql 
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'TARGET_DB' -- ← change this to your DB
  AND pid <> pg_backend_pid();
```
then run:
```sql 
SELECT pg_terminate_backend(pid int)
```
to kill the process(es).

## Articles
  - [Ten tips going to prod](https://severalnines.com/blog/ten-tips-going-production-postgresql/)
  - [Tuning your PostgreSQL server](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server) 
  - [Just Use Postgres for Everything](https://www.amazingcto.com/postgres-for-everything/)
  - [Delete Duplicate Rows](https://sqlfordevs.com/delete-duplicate-rows)
  - [How to tune PSQL](https://pgtune.leopard.in.ua/#/)
