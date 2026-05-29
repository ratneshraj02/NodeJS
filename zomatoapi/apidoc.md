// Page - 1

- List of all cities

  > [/location](http://localhost:8000/location)

- List of all restaurants

  > [/restaurant](http://localhost:8000/restaurant)

- Restaurant wrt city

  > [/restaurant?stateId=1](http://localhost:8000/restaurant?stateId=1)

  > [/restaurant?stateId=3&mealId=1](http://localhost:8000/restaurant?mealId=3&stateId=1)

- List of meal
  > [/meals](http://localhost:8000/meals)

//Page - 2

- Restaurant on the basis of mealType
  > [/restaurant?stateId=3](http://localhost:8000/restaurant?mealId=3)
- Restaurant wrt mealType + cuisineType
  > [/filter/1?cuisineId=1](http://localhost:8000/filter/1?cuisineId=3&stateId=1)
- Restaurant wrt mealType + cost
  > [/filter/1?hCost=600&lCost=300](http://localhost:8000/filter/1?hCost=600&lCost=300)
  > [/filter/1?hCost=600&lCost=300&cuisineId=1](http://localhost:8000/filter/1?hCost=600&lCost=300&cuisineId=1)
- Sort on the basic of price
  > [/filter/1?hCost=600&lCost=300&sort=1](http://localhost:8000/filter/1?hCost=600&lCost=300&sort=1)
- Pagination
  > [/filter/1?cuisine=2&skip=1&limit=1](http://localhost:8000/filter/1?cuisine=2&skip=1&limit=1)

//Page - 3

- Details of restaurant
  > [/details/6a1853badad6a46e609df901](http://localhost:8000/details/6a1853badad6a46e609df901)
- Menu wrt to restaurant
  > [/menu/2](http://localhost:8000/menu/2)

//Page - 4

- Details of selected menu

- Place order

//Page - 5

- View all order/ with or without email
  > [/orders?email=aakash@gmail.com](http://localhost:8000/orders?email=aakash@gmail.com)
- Update order details
- Delete Order
