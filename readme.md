# Catatan

- Pertama perlu import postman_collection 
- Set up .env and config.js
- set up database: - sequelize db:create, sequelize db:migrate

## Start the server
```
npm run start
- port: 4000
```

## Set up postman
```
- Import "Chapter 7 lkm.postman_collection" in postman
```

### Perhatikan saat isi variable postman
```
- Params
- Headers
- Body

masukan Token manual saja, setelah login
```

## Restriction Information
```
Restriction information divided into 2 role:
   - 'player' : 
   - 'admin'
```

## Penggunaan TOKEN dan VARIABLE di POSTMAN
### API - Endpoint :
###  - Homepage-lkm
```
Headers butuh token authorization
Body butuh "username"

```
###  - Dashboard (only accessible for role: admin !!)
```
/api/auth-admin/dashboard/:id_player

Params: :id_player
Headers: Token from role admin user
```

###  - REGISTER and LOGIN
```
+ REGISTER: 

-req.body
{
    "username": "aaa",
    "password": "aaa",
    "role": "player" ATAU "role": "admin
}

+ LOGIN: 

-x-www-form-urlencoded
{
    "username": "aaa",
    "password": "aaa",
}
```
### - Fight 1 and 2 (Only accessible as role: player)
```
req.params : roomID
Headers: Token
req.body: { "option": "batu" }
```

### - Create Room (Only accessible as role: player)
```
---> /api/auth-player/create-room

Headers: Token
req.body: { "name": "ruang_perang" }
```

### - Profile (for all role)
```
api/auth-player/whoami

api/auth-admin/whoami

Headers: Token
```


## License
[MIT](https://choosealicense.com/licenses/mit/)