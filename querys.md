## Example querys

```graphql
mutation {
    addPerson(name: "Marta", street: "Street 789", city: "Montevideo", phone: "346-4567895") {
        id
        name
        phone
        address {
            city
            street
        }
    }
}

query {
    personCount
    peopleWithPhone: people(phone: YES) {
        name
    }
    peopleWithoutPhone: people(phone: NO) {
        name
    }
}
```
