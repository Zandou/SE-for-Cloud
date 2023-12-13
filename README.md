# Projet Software Engineering for Cloud
## Groupe
- JIANG Senhao
- HUDAYBERDIYEV Kerim

## Import DB data from a SQL file into MySQL instance on Kubernetes

### Copy the SQL file to your pod
```bash
cd ./mysql
kubectl cp BDD_Architecture.sql <NAME_OF_THE_POD>:/media/
```

### Connect to the mysql pod
```bash
kubectl exec -it  <NAME_OF_THE_POD> -- /bin/sh
```

### Import the SQL data into the DB
```bash
mysql -h mysql -u root -ppassword  < /media/BDD_Architecture.sql
```

### To test and see the database's data
```bash
kubectl run -it --rm --image=mysql:8.0 --restart=Never mysql-client -- mysql -h mysql --password="password"
```
