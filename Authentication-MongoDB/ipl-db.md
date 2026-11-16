## IPL DB

- Team
- Player
- Owners
- Sponsors
- Broadcasters


### Owner
```javascript
owner : {
    id,
    name,
    company,
    createdAt,
    updatedAt,
}
```

### Team
```javascript
team : {
    id,
    name,
    owner_id,
    createdAt,
    updatedAt,
}
```
### Players
``` javascript
players : {
    id,
    name,
    role,
    team_id
    createdAt,
    updatedAt,
}
```

### Sponsors
``` javascript
sponsors : {
    id,
    name,
    createdAt,
    updatedAt,
}
```

### Broadcasters
``` javascript
broadcasters : {
    id,
    name,
    createdAt,
    updatedAt,
}
```

## Relationship Summary
    Owner -------> Team --(1 to N)
    Team --------> Player --(1 to N)
    Team --------> sponsors --(N to N)
    Team --------> Broadcaster --(N to N)



