# Project Software Engineering for Cloud
## Team
- JIANG Senhao
- HUDAYBERDIYEV Kerim

## Project installation

```bash
minikube start
```

### Apply every yaml file in each k8s folder in frontend, service logement and mysql folder

```bash
kubectl apply -f <NAME_OF_THE_FILE>
```

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
### Display the data within the database

```bash
USE agence;
```

```bash
SELECT * FROM logement;
```

## Connect to the frontend pod

### We use a port-forward on the frontend port
```bash
kubectl port-forward <NAME_OF_THE_POD> 3000:3000
```

### The app will now be port-forwarded to your localhost:3000

http://localhost:3000


