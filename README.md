# Weapon Wheel GUI Prototype thing
Weapon wheel GUI proof of concept, inspired by [Accursed Farms' video on GUI](https://youtu.be/AItTqnTsVjA) and optimized for speed.
You can try it out [on my website](http://www.hydrateyourself.moe/pages/weaponwheelgui/).
The idea is that the menu would be bound to something like mouse5,
and could be opened anywhere as long as there is no fullscreen application running.
The size of the circle is tricky to get right.
Too small and you can't navigate quickly by flicking,
too large and there isn't enough screen space available.
This current version is probably on the side of being too large.
Maybe fancy mouse teleporting could solve this?
If you want to play around with the values yourself,
you can change the values in **src/wheel/Wheel.ts**.
You can change the layout of the wheel by editing **dist/wheel.json**.
You'll need the TypeScript compiler and webpack to recompile the code.
