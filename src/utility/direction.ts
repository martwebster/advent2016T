
export enum Dir {
   North = "N",
   East = "E",
   South = "S",
   West = "W",
}

export namespace Dir {
   export const turnClockwise= (dir : Dir) : Dir =>{
      switch (dir) {
         case Dir.North: return Dir.East
         case Dir.East: return Dir.South
         case Dir.South: return Dir.West
         case Dir.West: return Dir.North
      }
   }

   export const turnAntiClockwise= (dir : Dir) : Dir =>{
      switch (dir) {
         case Dir.North: return Dir.West
         case Dir.West: return Dir.South
         case Dir.South: return Dir.East
         case Dir.East: return Dir.North
      }
   }

   export const moveForward = (pos: Pos, dir: Dir, distance: number = 1): Pos =>{

      var currentPos = pos;
      for (let _ = 0; _ < distance; _++) {
         switch (dir) {
            case Dir.South: {
               currentPos = {
                  x: currentPos.x,
                  y: currentPos.y + 1
               }
               break;
            }
            case Dir.North: {
               currentPos = {
                  x: currentPos.x,
                  y: currentPos.y - 1
               }
               break;
            }
            case Dir.East: {
               currentPos = {
                  x: currentPos.x + 1,
                  y: currentPos.y,
               }
               break;
            }
            case Dir.West: {
               currentPos = {
                  x: currentPos.x - 1,
                  y: currentPos.y,
               }
               break;
            }
         }
      }
      return currentPos;
   }

}
