/*
------------
|    Room   |
------------
| roomName    ='Room 1'  |
------------
| enter()   |
| getName() |
|           |
------------

------------
|    Room   |
------------
| roomName    ='Room 2' |
------------
| enter()   |
| getName() |
|           |
------------
*/


class Room {
constructor(roomName)
{
this.roomName = roomName
}

enter(){
    console.log('you have entered into : ', this.getName())
}
getName(){
    return this.roomName
}
}
const room1 = new Room('Room1')
const room2 = new Room('Room2')

console.log(room1.getName())  //Room1
console.log(room2.getName()) //Room2
